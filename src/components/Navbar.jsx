import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiPlay,
} from "react-icons/fi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const goToSection = (section) => {
  closeMenu();

  if (window.location.pathname === "/") {
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  } else {
    navigate("/");

    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  }
};

  return (
    <header className="navbar">
      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="logo-icon">
            <FiPlay />
          </span>

          <span className="logo-text">
            REEL<span>ROOM</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Movies
          </NavLink>

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Watchlist
          </NavLink>

          <button
            className="nav-section-link"
            onClick={() => goToSection("genres")}
          >
            Genres
          </button>

          <button
            className="nav-section-link"
            onClick={() => goToSection("trending")}
          >
            Trending
          </button>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">

          <div
            className={`nav-search-box ${
              searchOpen ? "open" : ""
            }`}
          >
            {searchOpen && (
              <input
                type="text"
                placeholder="Search movies..."
                autoFocus
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    e.target.value.trim()
                  ) {
                    window.location.href = `/movies?search=${encodeURIComponent(
                      e.target.value.trim()
                    )}`;
                  }
                }}
              />
            )}

            <button
              className="nav-search"
              aria-label="Search"
              onClick={() => {
                if (!searchOpen) {
                  setSearchOpen(true);
                } else {
                  const input = document.querySelector(
                    ".nav-search-box input"
                  );

                  if (input && input.value.trim()) {
                    window.location.href = `/movies?search=${encodeURIComponent(
                      input.value.trim()
                    )}`;
                  }
                }
              }}
            >
              <FiSearch />
            </button>
          </div>


          <button
            className="nav-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="mobile-menu"
        initial={false}
        animate={{
          height: menuOpen ? "auto" : 0,
          opacity: menuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
      >
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/movies"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Movies
        </NavLink>

        <NavLink
          to="/watchlist"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Watchlist
        </NavLink>

        <button
          className="nav-section-link"
          onClick={() => goToSection("genres")}
        >
          Genres
        </button>

        <button
          className="nav-section-link"
          onClick={() => goToSection("trending")}
        >
          Trending
        </button>
      </motion.div>
    </header>
  );
}

export default Navbar;