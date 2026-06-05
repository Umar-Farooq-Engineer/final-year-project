import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginRequest, saveToken, saveUser } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await loginRequest({ email, password });
      saveToken(response.data.token);
      saveUser(response.data.user);
      navigate("/predict");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-heading">
          <div>
            <span className="badge">Welcome Back</span>
            <h2>Login to your account</h2>
            <p>Access your saved predictions and continue your potato disease monitoring.</p>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don&apos;t have an account? <Link to="/signup">Create one now</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
;
