from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd

# =========================
# Load model & metadata
# =========================
MODEL_PATH = "models/logistic_regression.pkl"
FEATURES_PATH = "models/feature_names.pkl"
LABELS_PATH = "models/label_mapping.pkl"

model = joblib.load(MODEL_PATH)
feature_names = joblib.load(FEATURES_PATH)

# Label mapping: class index -> outcome name
inv_label_mapping = {
    0: "Home Win",
    1: "Draw", 
    2: "Away Win"
}

# =========================
# FastAPI app
# =========================
app = FastAPI(
    title="Football Match Outcome Prediction API",
    description="Professional ML API for Home / Draw / Away prediction",
    version="1.0.0"
)

# ADD CORS MIDDLEWARE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Input schema
# =========================
class MatchFeatures(BaseModel):
    home_shots: float
    home_shotsOnTarget: float
    home_ppda: float
    away_shots: float
    away_shotsOnTarget: float
    away_ppda: float

# =========================
# Health check
# =========================
@app.get("/")
def health_check():
    return {
        "status": "API is running",
        "model": "Logistic Regression",
        "features": feature_names
    }

# =========================
# Prediction endpoint
# =========================
@app.post("/predict")
def predict_match(features: MatchFeatures):

    try:
        # Convert input to DataFrame (without column names to avoid sklearn warning)
        input_data = [[ 
            features.home_shots,
            features.home_shotsOnTarget,
            features.home_ppda,
            features.away_shots,
            features.away_shotsOnTarget,
            features.away_ppda
        ]]
        
        input_df = pd.DataFrame(input_data)

        # Prediction
        pred_class = int(model.predict(input_df)[0])
        pred_proba = model.predict_proba(input_df)[0]

        return {
            "prediction": inv_label_mapping[pred_class],
            "probabilities": {
                inv_label_mapping[i]: round(float(prob), 4)
                for i, prob in enumerate(pred_proba)
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# venv\Scripts\Activate.ps1
# uvicorn app:app --reload