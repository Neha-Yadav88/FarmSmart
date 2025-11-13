import pandas as pd
import joblib
import numpy as np
import os
from preprocessing import load_preprocessor, NUMERIC_FEATURES
from label_encoder import load_label_map

MODEL_PATH = "ml-service/models/model.pkl"
PREPROCESSOR_PATH = "ml-service/models/preprocessor.pkl"


# ==========================
# LOAD MODEL + PREPROCESSOR + LABEL MAP
# ==========================

def load_artifacts():
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("❌ model.pkl not found! Train the model first.")

    if not os.path.exists(PREPROCESSOR_PATH):
        raise FileNotFoundError("❌ preprocessor.pkl not found!")

    model = joblib.load(MODEL_PATH)
    preprocessor = load_preprocessor()
    label_map = load_label_map()

    # reverse mapping (id → crop name)
    id_to_label = {v: k for k, v in label_map.items()}

    return model, preprocessor, id_to_label


# ==========================
# PREDICT FUNCTION
# ==========================

def predict_single(input_dict):
    """
    input_dict example:
    {
        "N": 90,
        "P": 40,
        "K": 43,
        "temperature": 20.5,
        "humidity": 82.1,
        "ph": 6.4,
        "rainfall": 200.0
    }
    """

    # Load artifacts
    model, preprocessor, id_to_label = load_artifacts()

    # Convert input data to DataFrame
    df = pd.DataFrame([input_dict])

    # Keep only required numeric features
    X = df[NUMERIC_FEATURES]

    # Transform
    X_trans = preprocessor.transform(X)

    # Predict class (numeric)
    pred_class = model.predict(X_trans)[0]

    # Reverse mapping
    crop_name = id_to_label[pred_class]

    # Confidence (probability)
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(X_trans)[0]
        confidence = float(np.max(proba))
    else:
        confidence = None

    # Final response
    return {
        "recommended_crop": crop_name,
        "confidence": round(confidence, 4) if confidence else None,
        "status": "success"
    }


# ==========================
# TEST RUN (CLI)
# ==========================

if __name__ == "__main__":
    sample = {
        "N": 90,
        "P": 40,
        "K": 43,
        "temperature": 20.5,
        "humidity": 82.1,
        "ph": 6.4,
        "rainfall": 200.0
    }

    print("\n🔍 Testing Single Prediction...")
    print(predict_single(sample))
