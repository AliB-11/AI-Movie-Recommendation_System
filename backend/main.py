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
def clean_title(title):
    return re.sub("[^a-zA-Z0-9 ]", "", title)

movies["clean_title"] = movies["title"].apply(clean_title)

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


# --- FastAPI endpoint ---
@app.get("/search")
def search_movies(query: str = Query(..., description="Movie title to search")):
     movie_id = int(search(query))
     return {"movieId": movie_id}

    