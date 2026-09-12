import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiBookmark } from "react-icons/fi";

import MovieCard from "../components/MovieCard";
import movies from "../data/movies";

function Watchlist() {
  const [watchlistIds, setWatchlistIds] = useState(() => {
    return JSON.parse(
      localStorage.getItem("reelroom-watchlist") || "[]"
    );
  });

  const watchlistMovies = movies.filter((movie) =>
    watchlistIds.includes(movie.id)
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkWatchlist = () => {
      const saved = JSON.parse(
        localStorage.getItem("reelroom-watchlist") || "[]"
      );

      setWatchlistIds(saved);
    };

    window.addEventListener("watchlistUpdated", checkWatchlist);

    return () => {
      window.removeEventListener(
        "watchlistUpdated",
        checkWatchlist
      );
    };
  }, []);

  return (
    <section className="watchlist-page">
      <div className="container">
        <motion.div
          className="watchlist-header"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="section-label">
              YOUR CINEMA COLLECTION
            </span>

            <h1>
              My <span>Watchlist</span>
            </h1>

            <p>
              Movies you saved to watch later.
            </p>
          </div>

          <div className="watchlist-count">
            <FiBookmark />
            <strong>{watchlistMovies.length}</strong>
            <span>Saved</span>
          </div>
        </motion.div>

        <Link
          to="/movies"
          className="back-movies watchlist-back"
        >
          <FiArrowLeft />
          Back to Movies
        </Link>

        {watchlistMovies.length > 0 ? (
          <div className="watchlist-grid">
            {watchlistMovies.map((movie, index) => (
              <motion.div
                className="watchlist-item"
                key={movie.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                layout
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="watchlist-empty"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="watchlist-empty-icon">
              <FiBookmark />
            </div>

            <h2>Your watchlist is empty</h2>

            <p>
              Save movies you want to watch later and
              they will appear here.
            </p>

            <Link
              to="/movies"
              className="hero-watch"
            >
              Browse Movies
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Watchlist;