from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import os, numpy as np
from utils import preprocess_image
import pandas as pd
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Load Model
model = load_model("../model/potato_disease_model.h5")

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/predict", methods=["POST"])
def predict():
    file = request.files["image"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    img = preprocess_image(file_path)
    prediction = model.predict(img)
    class_index = np.argmax(prediction)
    confidence = float(np.max(prediction)) * 100   #
    result = CLASS_NAMES[class_index]

    # Save prediction log
    data = {
        "image_name": file.filename,
        "prediction": result,
        "date": datetime.now()
    }
    df = pd.DataFrame([data])
    df.to_csv("predictions.csv", mode="a", header=False, index=False)

    return jsonify({"prediction": result,
                    "confidence": round(confidence, 2)})

if __name__ == "__main__":
    app.run(debug=True)
