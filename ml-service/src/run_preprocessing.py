import pandas as pd
import sys
from label_encoder import create_label_map, save_label_map
from preprocessing import fit_and_save_preprocessor

print("\n========================")
print("STEP 1: PREPROCESSING")
print("========================\n")

if len(sys.argv) < 2:
    print("Usage: python src/run_preprocessing.py <csv_path>")
    exit()

csv_path = sys.argv[1]

# LOAD DATASET
df = pd.read_csv(csv_path)
print("📌 Dataset Loaded!")
print("Shape:", df.shape)

# HANDLE MISSING VALUES (none expected)
print("\n📌 Missing Values:")
print(df.isnull().sum())

# LABEL ENCODING
print("\n📌 Creating Label Map...")
label_to_id, id_to_label = create_label_map(df["label"].values)
save_label_map(label_to_id)
print("✅ Label Map Saved!")
print(label_to_id)

# REPLACE LABEL COLUMN WITH ENCODED VALUES
df["label"] = df["label"].map(label_to_id)

# FIT PREPROCESSOR
pre = fit_and_save_preprocessor(df)

print("\n🎉 STEP 1 COMPLETED SUCCESSFULLY!")
