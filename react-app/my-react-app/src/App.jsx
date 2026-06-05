
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import StorageMonitor from "./pages/StorageMonitor";
import History from "./pages/History";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/predict"
              element={
                <ProtectedRoute>
                  <Predict />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
            <Route path="/storage" element={<StorageMonitor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function Footer() {
  return (
    <footer style={{
      background: '#2c3e50',
      color: '#ecf0f1',
      textAlign: 'center',
      padding: '2rem 1rem',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ margin: '0', fontSize: '0.9rem' }}>
          © 2024 Smart Potato Disease Detection & Cold Storage System
        </p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', opacity: '0.8' }}>
          Powered by AI & IoT Technology
        </p>
      </div>
    </footer>
  );
}

export default App;

