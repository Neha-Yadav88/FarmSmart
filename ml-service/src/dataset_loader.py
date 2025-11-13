import pandas as pd
import sys
import os

def load_dataset(csv_path):
    print("\n==============================")
    print("📌 DATASET LOADING STARTED")
    print("==============================\n")

    if not os.path.exists(csv_path):
        print(f"❌ ERROR: File not found at {csv_path}")
        return

    # Load dataset
    df = pd.read_csv(csv_path)

    # Basic dataset details
    print("✅ Dataset Loaded Successfully!")
    print("\n📊 Shape (rows, columns):", df.shape)

    print("\n📌 First 5 rows:")
    print(df.head())

    print("\n📌 Missing Values:")
    print(df.isnull().sum())

    if 'label' in df.columns:
        print("\n🌾 Unique Crops (label column):")
        print(df['label'].unique())
    else:
        print("\n⚠️ 'label' column not found!")

    # Save summary
    summary_path = "ml-service/logs/eda_summary.txt"
    os.makedirs(os.path.dirname(summary_path), exist_ok=True)

    with open(summary_path, "w") as f:
        f.write("=== DATASET SUMMARY ===\n")
        f.write(f"Shape: {df.shape}\n\n")
        f.write("Columns:\n")
        f.write(str(df.columns) + "\n\n")
        f.write("Missing Values:\n")
        f.write(str(df.isnull().sum()) + "\n\n")
        if 'label' in df.columns:
            f.write("Unique Labels:\n")
            f.write(str(df['label'].unique()) + "\n")

    print(f"\n📁 Summary saved to: {summary_path}")
    print("\n✅ STEP 1 COMPLETED SUCCESSFULLY!\n")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python src/dataset_loader.py <csv_file_path>")
    else:
        load_dataset(sys.argv[1])
