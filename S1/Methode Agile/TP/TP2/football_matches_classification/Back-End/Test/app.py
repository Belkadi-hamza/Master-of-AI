import requests
import json

# Base URL
BASE_URL = "http://127.0.0.1:8000"

print("=" * 60)
print("Testing Football Match Outcome Prediction API")
print("=" * 60)

# Test 1: Health Check
print("\n1. Testing Health Check Endpoint (GET /)")
print("-" * 60)
try:
    response = requests.get(f"{BASE_URL}/")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")

# Test 2: Make a Prediction
print("\n2. Testing Prediction Endpoint (POST /predict)")
print("-" * 60)

# Sample match features
sample_data = {
    "home_shots": 15,
    "home_shotsOnTarget": 5,
    "home_ppda": 8.5,
    "away_shots": 12,
    "away_shotsOnTarget": 4,
    "away_ppda": 7.2
}

print(f"Input Data: {json.dumps(sample_data, indent=2)}")

try:
    response = requests.post(
        f"{BASE_URL}/predict",
        json=sample_data
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")

# Test 3: Another Prediction with Different Data
print("\n3. Testing Prediction with Different Data")
print("-" * 60)

sample_data_2 = {
    "home_shots": 20,
    "home_shotsOnTarget": 8,
    "home_ppda": 10.0,
    "away_shots": 8,
    "away_shotsOnTarget": 2,
    "away_ppda": 5.5
}

print(f"Input Data: {json.dumps(sample_data_2, indent=2)}")

try:
    response = requests.post(
        f"{BASE_URL}/predict",
        json=sample_data_2
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")

print("\n" + "=" * 60)
print("Testing Complete")
print("=" * 60)
