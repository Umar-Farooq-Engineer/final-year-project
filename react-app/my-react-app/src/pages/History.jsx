import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHistory, getCurrentUser, isLoggedIn } from "../services/auth";

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = getCurrentUser();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    const loadHistory = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetchHistory();
        setHistory(response.data);
      } catch (err) {
        console.error("Fetch history error:", err);
        setError("Unable to load your saved records.");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [navigate]);

  return (
    <div className="history-page">
      <div className="history-header">
        <h2>{user ? `${user.name}'s Saved Records` : "Saved Records"}</h2>
        <p>Only you can see your saved prediction history.</p>
      </div>

      {loading ? (
        <p>Loading your records...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : history.length === 0 ? (
        <div className="history-empty">
          <p>No saved records yet.</p>
          <button className="btn btn-primary" onClick={() => navigate("/predict")}>Make a prediction</button>
        </div>
      ) : (
        <div className="history-grid">
          {history.map((record) => (
            <div key={record._id} className="history-card">
              <div className="history-card-header">
                <strong>{record.prediction}</strong>
                <span>{new Date(record.createdAt).toLocaleString()}</span>
              </div>
              <p>Confidence: {record.confidence}%</p>
              {record.notes && <p className="history-notes">Notes: {record.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
