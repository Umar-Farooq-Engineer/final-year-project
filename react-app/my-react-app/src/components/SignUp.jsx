import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupRequest, saveToken, saveUser } from "../services/auth";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await signupRequest({ name, email, password });
      saveToken(response.data.token);
      saveUser(response.data.user);
      navigate("/predict");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-heading">
          <div>
            <span className="badge badge-soft">Create account</span>
            <h2>Sign up to get started</h2>
            <p>Register now and save your potato disease predictions securely.</p>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />

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
            placeholder="Create a password"
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Log in here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

