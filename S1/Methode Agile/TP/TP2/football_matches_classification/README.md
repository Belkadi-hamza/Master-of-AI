# Football Matches Classification

End-to-end project for predicting football match outcomes (Home Win / Draw / Away Win) using a machine learning model, a FastAPI backend, and a React + Vite frontend.

## Project structure

- Back-End/: FastAPI service that loads the trained model and exposes prediction endpoints.
- Front-End/: React + Vite UI to send match statistics and display predictions.
- Modele/: notebooks, datasets, and trained model artifacts.

## Features

- FastAPI inference API with JSON request/response
- React UI for interactive predictions
- Trained logistic regression model with feature metadata

## Requirements

- Python 3.10+ (for the API)
- Node.js 18+ and npm (for the UI)

## Quick start

### 1) Run the backend API

From Back-End/:

- Create and activate a virtual environment
- Install dependencies (fastapi, uvicorn, pandas, numpy, joblib, pydantic)
- Start the API with uvicorn app:app --reload

The API will be available at http://127.0.0.1:8000

### 2) Run the frontend UI

From Front-End/:

- Install dependencies
- Start the dev server with npm run dev

The UI will be available at the Vite dev server URL.

## API overview

- GET /: Health check and model metadata
- POST /predict: Predict outcome using match statistics

Request payload fields:
- home_shots
- home_shotsOnTarget
- home_ppda
- away_shots
- away_shotsOnTarget
- away_ppda

## Notes

- Model artifacts are stored in Modele/models/.
- Datasets are in Modele/Data/.
- Frontend expects the API at http://localhost:8000.
