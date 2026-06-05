import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DiseaseResult from "./DiseaseResult";
import { isLoggedIn, saveHistory } from "../services/auth";

function UploadLeaf() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first");
      return;
    }

    setIsLoading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/predict", formData);
      setResult(res.data);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    if (!isLoggedIn()) {
      navigate("/signup");
      return;
    }

    setSaving(true);
    setMessage("");

    const payload = {
      prediction: result.prediction || result.disease || result.label || "Unknown",
      confidence:
        typeof result.confidence === "number"
          ? result.confidence
          : Number(result.confidence) || 0,
      notes: JSON.stringify(result),
    };

    try {
      await saveHistory(payload);
      setMessage("Prediction saved to your history.");
    } catch (error) {
      console.error("Save failed:", error);
      setMessage("Could not save the record. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  return (
    <div className="upload-section">
      <div
        className={`upload-area ${dragOver ? "dragover" : ""}`}
        style={{ display: "flex", width: "400px", height: "200px", marginLeft: "170px", flexDirection: "column", paddingTop: "5px" }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input").click()}
      >
        <span className="upload-icon">📷</span>
        <div className="upload-text">
          {file ? `Selected: ${file.name}` : "Click to select potato leaf image"}
        </div>
        <div className="upload-subtext">Supported formats: JPG, PNG, JPEG</div>
        <input
          id="file-input"
          type="file"
          onChange={handleFileInputChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>

      <button className="btn btn-primary predict-btn" onClick={handleUpload} disabled={!file || isLoading}>
        {isLoading ? (
          <>
            <span className="loading"></span> Analyzing...
          </>
        ) : (
          "Predict Disease"
        )}
      </button>

      {result && (
        <>
          <DiseaseResult result={result} />
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <button className="btn btn-secondary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Record"}
            </button>
            {message && <p className="save-message">{message}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default UploadLeaf;
