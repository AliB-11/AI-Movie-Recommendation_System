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
    "http://localhost:5173",  # frontend URL
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

def find_similar_movies(movie_id):
    #Finding reccomenedation from similar users
    similar_users = ratings[(ratings["movieId"] == movie_id) & (ratings["rating"] >= 4.5)] ["userId"].unique()
    similar_user_recs = ratings[(ratings["userId"].isin(similar_users)) & (ratings["rating"] >= 4.5)]["movieId"]
#     similar_users = top_ratings[(top_ratings["movieId"] == movie_id) & (top_ratings["rating"] >= 4.5)]["userId"].unique()
#     similar_user_recs = top_ratings[(top_ratings["userId"].isin(similar_users)) & (top_ratings["rating"] >= 4.5)]["movieId"]
    
   
    #Over 10% of users reccomend the movie
    similar_user_recs = similar_user_recs.value_counts() / len(similar_users)
    similar_user_recs = similar_user_recs[similar_user_recs > .1]
    
    #Finding how common the reccoemendation were among all users 
    all_users = ratings[(ratings["movieId"].isin(similar_user_recs.index)) & (ratings["rating"] >= 4 )]
#     all_users = top_ratings[(top_ratings["movieId"].isin(similar_user_recs.index)) & (top_ratings["rating"] >= 4)]
    all_user_recs = all_users["movieId"].value_counts() / len(all_users["userId"].unique())
    
    #Generate a score 
    rec_percentages = pd.concat([similar_user_recs, all_user_recs], axis =1)
    rec_percentages.columns = ["similar", "all"]
    rec_percentages["score"] = rec_percentages["similar"] / rec_percentages["all"]
    
    base_genres = set(movies.loc[movies["movieId"] == movie_id, "genres"].values[0].split('|'))

    def genre_similarity(candidate_id):
        candidate_genres = set(movies.loc[movies["movieId"] == candidate_id, "genres"].values[0].split('|'))
        overlap = len(base_genres & candidate_genres)
        # Fraction of genres that overlap
        return overlap / len(base_genres) if len(base_genres) > 0 else 0

    # Apply a small boost to the score
    rec_percentages["score"] = rec_percentages.apply(
        lambda row: row["score"] * (1 + 0.1 * genre_similarity(row.name)),
        axis=1
    )
    
    #Sorting Scores 
    rec_percentages = rec_percentages.sort_values("score", ascending=False)  
    
    #Return top 10 reccomendations and merging with dataset
    rec_percentages = rec_percentages.head(10).reset_index().merge(
    movies[['movieId', 'clean_title']],
    left_on='index',
    right_on='movieId'
)
    
    return rec_percentages