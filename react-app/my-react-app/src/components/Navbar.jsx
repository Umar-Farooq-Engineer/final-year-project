
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn, getCurrentUser, logout } from "../services/auth";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleStorage = () => setLoggedIn(isLoggedIn());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate("/login");
  };

  const user = loggedIn ? getCurrentUser() : null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🥔 Smart Potato System
        </Link>

        <button className="navbar-toggle" onClick={() => setIsOpen((open) => !open)}>
          ☰
        </button>

        <ul className={`navbar-nav ${isOpen ? "show" : ""}`}>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={() => {
                setIsOpen(false);
                setLoggedIn(isLoggedIn());
              }}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/predict"
              className={location.pathname === "/predict" ? "active" : ""}
              onClick={() => {
                setIsOpen(false);
                setLoggedIn(isLoggedIn());
              }}
            >
              Predict Disease
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className={location.pathname === "/history" ? "active" : ""}
              onClick={() => {
                setIsOpen(false);
                setLoggedIn(isLoggedIn());
              }}
            >
              My Records
            </Link>
          </li>
          <li>
            <Link
              to="/storage"
              className={location.pathname === "/storage" ? "active" : ""}
              onClick={() => {
                setIsOpen(false);
                setLoggedIn(isLoggedIn());
              }}
            >
              Cold Storage
            </Link>
          </li>
          {loggedIn ? (
            <>
              <li className="navbar-user">Hello, {user?.name || "User"}</li>
              <li>
                <button className="navbar-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={location.pathname === "/login" ? "active" : ""}
                  onClick={() => {
                    setIsOpen(false);
                    setLoggedIn(isLoggedIn());
                  }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className={location.pathname === "/signup" ? "active" : ""}
                  onClick={() => {
                    setIsOpen(false);
                    setLoggedIn(isLoggedIn());
                  }}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
