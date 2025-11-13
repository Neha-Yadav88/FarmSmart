import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from label_encoder import load_label_map
from preprocessing import load_preprocessor, NUMERIC_FEATURES
import sys
import os

MODEL_PATH = "ml-service/models/model.pkl"


print("\n========================")
print("STEP 2: MODEL TRAINING")
print("========================\n")

if len(sys.argv) < 2:
    print("Usage: python src/train_model.py <csv_path>")
    exit()

csv_path = sys.argv[1]

# -------------------------
# 1. LOAD DATASET
# -------------------------
df = pd.read_csv(csv_path)
print("📌 Dataset Loaded!")
print("Shape:", df.shape)


# -------------------------
# 2. LOAD LABEL MAP
# -------------------------
label_map = load_label_map()
print("\n📌 Loaded label_map.json")
print(label_map)

df["label"] = df["label"].map(label_map)


# -------------------------
# 3. LOAD PREPROCESSOR
# -------------------------
preprocessor = load_preprocessor()


# -------------------------
# 4. TRAIN / TEST SPLIT
# -------------------------
X = df[NUMERIC_FEATURES]
y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print("\n📌 Train/Test Split Complete!")
print("Train Size:", X_train.shape)
print("Test Size:", X_test.shape)


# -------------------------
# 5. TRANSFORM USING PREPROCESSOR
# -------------------------
X_train_trans = preprocessor.transform(X_train)
X_test_trans = preprocessor.transform(X_test)

print("\n📌 Preprocessing Applied!")
print("Transformed Shape:", X_train_trans.shape)


# -------------------------
# 6. TRAIN RANDOM FOREST MODEL
# -------------------------
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=12,
    random_state=42
)

print("\n🔥 Training Model...")
model.fit(X_train_trans, y_train)

print("✅ Model Training Complete!")


# -------------------------
# 7. EVALUATE MODEL
# -------------------------
accuracy = model.score(X_test_trans, y_test)
print(f"\n🎯 Model Accuracy: {accuracy * 100:.2f}%\n")


# -------------------------
# 8. SAVE MODEL
# -------------------------
os.makedirs("ml-service/models", exist_ok=True)
joblib.dump(model, MODEL_PATH)

print(f"✅ Model saved at: {MODEL_PATH}")
print("\n🎉 STEP 2 COMPLETED SUCCESSFULLY!\n")
