# Back-End (FastAPI)

FastAPI service that loads a trained football match outcome model and exposes prediction endpoints.

## Endpoints

- GET /: Health check and model metadata
- POST /predict: Predict outcome using match statistics

### Request body (POST /predict)

JSON fields:
- home_shots
- home_shotsOnTarget
- home_ppda
- away_shots
- away_shotsOnTarget
- away_ppda

## Run locally

1) Create and activate a virtual environment
2) Install dependencies: fastapi, uvicorn, pandas, numpy, joblib, pydantic
3) Start the API with: uvicorn app:app --reload

The API listens on http://127.0.0.1:8000 by default.

## Testing

A simple test client is available at Back-End/Test/app.py. Start the API first, then run the test script to verify responses.

## Model files

The service loads model artifacts from Back-End/models/:
- logistic_regression.pkl
- feature_names.pkl
- label_mapping.pkl
