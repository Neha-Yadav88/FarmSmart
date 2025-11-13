from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import predict_single

app = Flask(__name__)
CORS(app)   # allow frontend/backend access


# -----------------------------
# HEALTH CHECK ROUTE
# -----------------------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ml-service-running",
        "message": "Service is up"
    })


# -----------------------------
# MAIN PREDICTION ROUTE
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict_route():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        result = predict_single(data)
        return jsonify(result)

    except Exception as e:
        return jsonify({
            "error": str(e),
            "message": "Prediction failed"
        }), 500


# -----------------------------
# START SERVER
# -----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
