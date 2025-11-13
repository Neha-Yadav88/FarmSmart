import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib
import os

NUMERIC_FEATURES = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
PREPROCESSOR_PATH = "ml-service/models/preprocessor.pkl"


# -------------------------
# Create Preprocessor
# -------------------------
def create_preprocessor():
    numeric_pipeline = Pipeline(steps=[
        ("scaler", StandardScaler())
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_pipeline, NUMERIC_FEATURES)
        ]
    )

    return preprocessor


# -------------------------
# Fit & Save Preprocessor
# -------------------------
def fit_and_save_preprocessor(df):
    X = df[NUMERIC_FEATURES]

    preprocessor = create_preprocessor()
    preprocessor.fit(X)

    os.makedirs("ml-service/models", exist_ok=True)
    joblib.dump(preprocessor, PREPROCESSOR_PATH)

    print("✅ Preprocessor saved at:", PREPROCESSOR_PATH)
    return preprocessor


# -------------------------
# Load Preprocessor
# -------------------------
def load_preprocessor():
    if os.path.exists(PREPROCESSOR_PATH):
        return joblib.load(PREPROCESSOR_PATH)
    else:
        print("⚠ Preprocessor not found, creating new one.")
        return create_preprocessor()
