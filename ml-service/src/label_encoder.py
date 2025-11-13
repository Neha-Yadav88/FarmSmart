import json
import os

LABEL_MAP_PATH = "ml-service/data/label_map.json"

def create_label_map(labels):
    unique_labels = sorted(list(set(labels)))
    label_to_id = {label: i for i, label in enumerate(unique_labels)}
    id_to_label = {i: label for label, i in label_to_id.items()}
    return label_to_id, id_to_label


def save_label_map(label_to_id):
    os.makedirs("ml-service/data", exist_ok=True)
    with open(LABEL_MAP_PATH, "w") as f:
        json.dump(label_to_id, f, indent=4)


def load_label_map():
    if not os.path.exists(LABEL_MAP_PATH):
        raise FileNotFoundError("label_map.json not found")
    with open(LABEL_MAP_PATH, "r") as f:
        return json.load(f)
