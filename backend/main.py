from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware 
import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = FastAPI()

# ---------------- CORS setup ----------------
origins = [
  "https://movie-store-lovat.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      
    allow_credentials=True,
    allow_methods=["*"],        
    allow_headers=["*"],        
)
# --------------------------------------------

# --- Preload movies & train vectorizer (done once at startup) ---
movies = pd.read_csv("movies.csv")  # keep in backend folder
links = pd.read_csv("links.csv")  # contains movieId, imdbId, tmdbId
recs = pd.read_csv("precomputed_recs.csv")

def clean_title(title):
    return re.sub("[^a-zA-Z0-9 ]", "", title)


movies["clean_title"] = movies["title"].apply(clean_title)
# join movies and links so each movie has its tmdbId
movies = movies.merge(links[["movieId", "tmdbId"]], on="movieId", how="left")
vectorizer = TfidfVectorizer(ngram_range=(1,2))
tfidf = vectorizer.fit_transform(movies["clean_title"])

# --- Search function ---
def search(title, top_n=5):
    title = clean_title(title)

    exact_matches = movies[movies["clean_title"] == title]
    if not exact_matches.empty:
        # Exact match exists: return first movieId
        return int(exact_matches.iloc[0]["movieId"])

    # Fuzzy search
    query_vec = vectorizer.transform([title])
    similarity = cosine_similarity(query_vec, tfidf).flatten()

    for i, movie_title in enumerate(movies["clean_title"]):
        if title in movie_title:
            similarity[i] += 1.0

    year_match = re.search(r"(19|20)\d{2}", title)
    if year_match:
        year = year_match.group(0)
        similarity += movies["clean_title"].str.contains(year).astype(float) * 0.5

    top_index = np.argmax(similarity)
    return int(movies.iloc[top_index]["movieId"])  # Return as int


def get_recommendations(movie_id):
    row = recs[recs["movieId"] == movie_id]

    if row.empty:
        return []

    rec_tmdb_ids = []
    for col in row.columns:
        if "_id" in col:   # assuming your precomputed file stores rec_1_id, rec_2_id, ...
            rec_movie_id = row.iloc[0][col]
            if pd.notna(rec_movie_id):
                # lookup tmdbId
                match = movies[movies["movieId"] == int(rec_movie_id)]
                if not match.empty and pd.notna(match.iloc[0]["tmdbId"]):
                    rec_tmdb_ids.append(int(match.iloc[0]["tmdbId"]))

    return rec_tmdb_ids

# --- FastAPI endpoint ---
@app.get("/search")
def search_movies(query: str = Query(..., description="Movie title to search")):
    movie_id = search(query)
    rec_tmdb_ids = get_recommendations(movie_id)
    return {"recommendation": rec_tmdb_ids}





# --- Recommendation Algorithm ---

def recommend_content(movie_id, top_n=10):

        # movies DataFrame: movieId, title, genres, clean_title

    # Combine title + genres into text features
    movies['text_features'] = movies['clean_title'] + " " + movies['genres'].str.replace('|', ' ')

    # TF-IDF Vectorizer
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(movies['text_features'])

    # Cosine similarity matrix
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # Movie index map
    movie_idx_map = pd.Series(movies.index, index=movies['movieId']).to_dict()

    if movie_id not in movie_idx_map:
        return pd.DataFrame()

    idx = movie_idx_map[movie_id]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1: top_n + 1]

    recommended_idx = [i[0] for i in sim_scores]
    recs = movies.iloc[recommended_idx][['movieId', 'clean_title', 'genres']].copy()
    recs['content_score'] = [i[1] for i in sim_scores]
    return recs



# Function: recommend by collaborative filtering
def recommend_collab(movie_id, top_n=10, min_ratings=50):
    movie_stats = ratings.groupby('movieId').agg({'rating': ['mean', 'count']})
    movie_stats.columns = ['avg_rating', 'rating_count']
    similar_users = ratings[ratings['movieId'] == movie_id]['userId'].unique()
    similar_ratings = ratings[ratings['userId'].isin(similar_users)]
    
    # aggregate mean ratings from these similar users
    recs = (
        similar_ratings.groupby('movieId')['rating']
        .mean()
        .reset_index()
        .rename(columns={'rating': 'collab_score'})
    )
    
    # merge with movie info
    recs = recs.merge(movies, on='movieId', how='left')
    recs = recs.merge(movie_stats, on='movieId', how='left')
    
    # filter out unpopular
    recs = recs[recs['rating_count'] >= min_ratings]
    recs = recs[recs['movieId'] != movie_id]
    
    return recs.sort_values('collab_score', ascending=False).head(top_n)


def recommend_hybrid(movie_id, top_n=10, alpha=0.5):
    """
    Hybrid recommender combining collaborative filtering and content-based AI.
    alpha = weight for collaborative filtering (0.0–1.0)
    """
    content_recs = recommend_content(movie_id, top_n * 2)
    collab_recs = recommend_collab(movie_id, top_n * 2)
    
    # merge on movieId
    hybrid = pd.merge(content_recs, collab_recs, on='movieId', how='outer', suffixes=('_content', '_collab'))
    
    # fill NaNs with 0
    hybrid['content_score'] = hybrid['content_score'].fillna(0)
    hybrid['collab_score'] = hybrid['collab_score'].fillna(0)
    
    # weighted hybrid score
    hybrid['hybrid_score'] = alpha * hybrid['collab_score'] + (1 - alpha) * hybrid['content_score']
    
    # sort by hybrid score
    return hybrid.sort_values('hybrid_score', ascending=False).head(top_n)