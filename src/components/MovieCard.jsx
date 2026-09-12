import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiPlay,
  FiStar,
  FiArrowUpRight,
  FiBookmark,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const [watchlisted, setWatchlisted] = useState(() => {
    const saved = JSON.parse(
      localStorage.getItem("reelroom-watchlist") || "[]"
    );

    return saved.includes(movie.id);
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = JSON.parse(
        localStorage.getItem("reelroom-watchlist") || "[]"
      );

      setWatchlisted(saved.includes(movie.id));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [movie.id]);

  const openMovie = () => {
    navigate(`/movie/${movie.id}`);
  };

  const toggleWatchlist = (e) => {
    e.stopPropagation();

    const saved = JSON.parse(
      localStorage.getItem("reelroom-watchlist") || "[]"
    );

    let updatedList;

    if (saved.includes(movie.id)) {
      updatedList = saved.filter(
        (movieId) => movieId !== movie.id
      );
      setWatchlisted(false);
    } else {
      updatedList = [...saved, movie.id];
      setWatchlisted(true);
    }

    localStorage.setItem(
      "reelroom-watchlist",
      JSON.stringify(updatedList)
    );
    window.dispatchEvent(new Event("watchlistUpdated"));
  };

  return (
    <motion.article
      className="movie-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={openMovie}
      style={{ cursor: "pointer" }}
    >
      <div className="movie-card-image">
        <img src={movie.image} alt={movie.title} />

        <div className="movie-card-overlay"></div>

        <div className="movie-rating">
          <FiStar />
          <span>{movie.rating}</span>
        </div>

        {/* Watchlist */}
        <button
          className={`movie-watchlist ${
            watchlisted ? "active" : ""
          }`}
          onClick={toggleWatchlist}
          aria-label={
            watchlisted
              ? `Remove ${movie.title} from watchlist`
              : `Add ${movie.title} to watchlist`
          }
        >
          <FiBookmark />
        </button>

        <motion.button
          className="movie-play"
          onClick={(e) => {
            e.stopPropagation();
            openMovie();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Open ${movie.title}`}
        >
          <FiPlay />
        </motion.button>

        <span className="movie-genre">
          {movie.genre}
        </span>
      </div>

      <div className="movie-card-info">
        <div>
          <h3>{movie.title}</h3>

          <div className="movie-meta">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.duration}</span>
          </div>
        </div>

        <button
          className="movie-arrow"
          onClick={(e) => {
            e.stopPropagation();
            openMovie();
          }}
          aria-label={`View ${movie.title}`}
        >
          <FiArrowUpRight />
        </button>
      </div>
    </motion.article>
  );
}

export default MovieCard;