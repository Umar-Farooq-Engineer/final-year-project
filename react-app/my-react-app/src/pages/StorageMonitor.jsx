import "../styles/storageDashboard.css";

function StorageMonitor() {
  // Dummy data (later replace with Node.js API)
  const temperature = 4;   // °C
  const humidity = 85;     // %
  const capacity = 1000;  // kg
  const stored = 620;     // kg

  const inventoryPercent = (stored / capacity) * 100;

  return (
    <div className="storage-container">
      <h2 className="storage-title">Cold Storage Monitoring</h2>
      <p className="storage-subtitle">
        Real-time environmental conditions and inventory status
      </p>

      <div className="storage-cards">

        {/* Temperature */}
        <div className="storage-card">
          <h3>Temperature</h3>
          <div className="storage-value">{temperature}°C</div>
          <div className="status good">Optimal</div>
        </div>

        {/* Humidity */}
        <div className="storage-card">
          <h3> Humidity</h3>
          <div className="storage-value">{humidity}%</div>
          <div className="status warning">Monitor</div>
        </div>

        {/* Inventory */}
        <div className="storage-card">
          <h3> Inventory</h3>
          <div className="storage-value">{stored} / {capacity} kg</div>

          <div className="inventory-bar">
            <div
              className="inventory-fill"
              style={{ width: `${inventoryPercent}%` }}
            ></div>
          </div>

          <div className="status good">
            {inventoryPercent.toFixed(0)}% Used
          </div>
        </div>

      </div>
    </div>
  );
}

export default StorageMonitor;
