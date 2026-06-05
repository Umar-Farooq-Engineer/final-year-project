import bgImage from "../assets/potato-field.jpg";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div
      className="hero"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Smart Potato Disease Detection & Cold Storage System</h1>

          <p>
            An AI-powered system that detects potato leaf diseases using
            Convolutional Neural Networks (CNN) and monitors cold storage
            conditions to reduce crop loss and improve food quality.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/predict") }>
              Predict Disease
            </button>
            <button className="btn-secondary" onClick={() => navigate("/history") }>
              My Records
            </button>
            <button className="btn-secondary" onClick={() => navigate("/storage") }>
              View Storage Dashboard
            </button>
          </div>

          <div className="features">
            <div className="feature-card">
              <h3> Disease Prediction</h3>
              <p>
                Upload potato leaf images and get instant disease detection
                with confidence score using deep learning.
              </p>
            </div>

            <div className="feature-card">
              <h3> Cold Storage Monitoring</h3>
              <p>
                Monitor temperature, humidity, and storage conditions to
                maintain optimal potato quality.
              </p>
            </div>

            <div className="feature-card">
              <h3> Inventory Management</h3>
              <p>
                Track potato inflow and outflow to prevent over-storage
                and wastage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
