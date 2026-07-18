from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import pickle
import os

# -----------------------------
# Configuration
# -----------------------------
# MODEL_PATH = "recommender_model.pkl"

# -----------------------------
# FastAPI instance
# -----------------------------
app = FastAPI(
    # title="Book Recommendation API (Local)",
    # description="Professional API for recommending books using TF-IDF & cosine similarity (Local Model).",
    # version="1.0.0",
    # docs_url="/"
    # redoc_url="/redoc"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# -----------------------------
# Load model from local file
# -----------------------------
# def load_model_from_file(path: str):
#     if not os.path.exists(path):
#         raise Exception(f"Model file not found at: {path}")
    
#     print(f"Loading model from {path}...")
#     with open(path, "rb") as f:
#         model_data = pickle.load(f)
#     print("✓ Model loaded successfully.")
#     return model_data

# try:
#     tfidf, tfidf_matrix_books, df_books_meta = load_model_from_file(MODEL_PATH)
#     print("✓ Model initialized successfully.")
# except Exception as e:
#     print(f"✗ Error: Failed to load model: {e}")
#     raise

# -----------------------------
# Pydantic schemas
# -----------------------------
# class RecommendationRequest(BaseModel):
#     domain: str = Field(..., json_schema_extra={"example": "computer science"})
#     modules: List[str] = Field(..., json_schema_extra={"example": ["machine learning", "python", "data mining"]})
#     limit: int = Field(..., gt=0, le=20, json_schema_extra={"example": 5})

# class Recommendation(BaseModel):
#     rank: int
#     title: str
#     price: Optional[float] = None
#     review_score: Optional[float] = None
#     review_summary: Optional[str] = None
#     score: float

# class RecommendationResponse(BaseModel):
#     status: str
#     count: int
#     recommendations: List[Recommendation]

@app.get("/")
def read_root():
    return {"message": "Welcome to the Book Recommendation API (Local Model). Visit /docs for API documentation."}
# -----------------------------
# Health check endpoint
# -----------------------------
# @app.get("/health", tags=["Health"])
# def health_check():
#     return {
#         "status": "healthy",
#         "service": "Book Recommendation API (Local)",
#         "version": "1.0.0",
#         "model_source": "local_file"
#     }

# # -----------------------------
# # Recommendation endpoint
# # -----------------------------
# @app.post("/api/v1/recommendations", response_model=RecommendationResponse,
#           summary="Get book recommendations",
#           description="Returns a ranked list of recommended books based on domain and studied modules.")
# def recommend_books(payload: RecommendationRequest):

#     if not payload.modules:
#         raise HTTPException(status_code=400, detail="Modules list cannot be empty.")

#     # Create user text
#     user_text = " ".join([payload.domain] + payload.modules)

#     # Vectorize
#     user_vector = tfidf.transform([user_text])

#     # Cosine similarity
#     similarity_scores = cosine_similarity(user_vector, tfidf_matrix_books).flatten()

#     # Top-N
#     top_indices = similarity_scores.argsort()[-payload.limit:][::-1]

#     # Build response with book details
#     recommendations = []
#     for i, idx in enumerate(top_indices):
#         book = df_books_meta.iloc[idx]
#         recommendations.append(
#             Recommendation(
#                 rank=i + 1,
#                 title=str(book.get("book_title", "N/A")),
#                 price=float(book["book_price"]) if pd.notna(book.get("book_price")) else None,
#                 review_score=float(book["review_score"]) if pd.notna(book.get("review_score")) else None,
#                 review_summary=str(book.get("review_summary", "")) if pd.notna(book.get("review_summary")) else None,
#                 score=round(float(similarity_scores[idx]), 4)
#             )
#         )

#     return RecommendationResponse(
#         status="success",
#         count=len(recommendations),
#         recommendations=recommendations
#     )

# -----------------------------
# Root endpoint
# -----------------------------
# @app.get("/", include_in_schema=False)
# def redirect_to_docs():
#     return RedirectResponse(url="/docs")