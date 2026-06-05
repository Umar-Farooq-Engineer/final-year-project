import UploadLeaf from "../components/UploadLeaf";

function Predict() {
  return (
    <div className="predict-container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>
        Potato Disease Prediction
      </h2>
      <UploadLeaf />
    </div>
  );
}

export default Predict;
