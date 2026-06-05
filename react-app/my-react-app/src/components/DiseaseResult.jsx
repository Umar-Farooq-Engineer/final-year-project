function DiseaseResult({ result }) {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#48bb78';
    if (confidence >= 60) return '#f6ad55';
    return '#f56565';
  };

  const getRecommendations = (disease) => {
    const recommendations = {
      'Early Blight': [
        'Remove affected leaves immediately',
        'Apply copper-based fungicide',
        'Improve air circulation around plants',
        'Avoid overhead watering'
      ],
      'Late Blight': [
        'Remove and destroy infected plants',
        'Apply fungicide immediately',
        'Ensure proper drainage',
        'Plant resistant varieties next season'
      ],
      'Healthy': [
        'Continue good farming practices',
        'Monitor plants regularly',
        'Maintain proper nutrition',
        'Keep records for future reference'
      ]
    };
    return recommendations[disease] || ['Consult agricultural expert for specific advice'];
  };

  return (
    <div className="card result-card">
      <div className="result-header">
        <span style={{ fontSize: '2rem' }}>
          {result.prediction === 'Healthy' ? '✅' : '⚠️'}
        </span>
        <h3 className="disease-name">{result.prediction}</h3>
      </div>

      <div className="confidence-meter">
        <div className="confidence-bar">
          <div
            className="confidence-fill"
            style={{
              width: `${result.confidence}%`,
              background: `linear-gradient(90deg, ${getConfidenceColor(result.confidence)}, ${getConfidenceColor(result.confidence)}aa)`
            }}
          ></div>
        </div>
        <div className="confidence-text">
          Confidence: {result.confidence}%
        </div>
      </div>

      <div className="recommendations">
        <h4>Recommendations:</h4>
        <ul>
          {getRecommendations(result.prediction).map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DiseaseResult;
