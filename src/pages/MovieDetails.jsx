import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiPlay,
  FiStar,
  FiCalendar,
  FiClock,
  FiFilm,
  FiGlobe,
} from "react-icons/fi";

import movies from "../data/movies";

function MovieDetails() {
  const { id } = useParams();

  const movie = movies.find(
    (item) => item.id === Number(id)
  );

  const [watchlisted, setWatchlisted] = useState(() => {
    if (!movie) return false;

    const saved = JSON.parse(
      localStorage.getItem("reelroom-watchlist") || "[]"
    );

    return saved.includes(movie.id);
  });

  const [trailerOpen, setTrailerOpen] = useState(false);

  const toggleWatchlist = () => {
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

  if (!movie) {
    return (
      <section className="movie-not-found">
        <div className="container">
          <h1>Movie Not Found</h1>

          <Link to="/movies">
            <FiArrowLeft />
            Back to Movies
          </Link>
        </div>
      </section>
    );
  }

  // Movies from the same genre
  const similarMovies = movies
    .filter(
      (item) =>
        item.genre === movie.genre &&
        item.id !== movie.id
    )
    .slice(0, 4);

  // More movies for the second recommendation row
  const moreMovies = movies
    .filter(
      (item) =>
        item.id !== movie.id &&
        !similarMovies.some(
          (similar) => similar.id === item.id
        )
    )
    .slice(0, 4);

  return (
    <section className="movie-details">

      <div className="container movie-details-container">

        {/* Back Button */}
        <Link to="/movies" className="back-movies">
          <FiArrowLeft />
          Back to Movies
        </Link>

        {/* =========================
            MAIN MOVIE SECTION
        ========================== */}

        <div className="movie-details-content">

          <motion.div
            className="details-poster"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={movie.image}
              alt={movie.title}
            />
          </motion.div>

          <motion.div
            className="details-info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >

            <span className="section-label">
              REELROOM ORIGINAL
            </span>

            <h1>{movie.title}</h1>

            <div className="details-meta">

              <span className="details-rating">
                <FiStar />
                {movie.rating}
              </span>

              <span>{movie.year}</span>

              <span>{movie.duration}</span>

              <span>{movie.genre}</span>

            </div>

            <p>{movie.description}</p>

            {/* Buttons */}
            <div className="details-buttons">

              {/* Watch Movie */}
              {movie.watch?.url && (
                <button
                  className="hero-watch watch-movie-btn"
                  onClick={() =>
                    window.open(
                      movie.watch.url,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <FiPlay />
                  Watch Movie
                </button>
              )}

              {/* Existing Buttons */}
              <div className="details-secondary-buttons">

                <button
                  className="hero-watch"
                  onClick={() =>
                    setTrailerOpen(true)
                  }
                >
                  <FiPlay />
                  Watch Trailer
                </button>

                <button
                  className="hero-explore"
                  onClick={toggleWatchlist}
                >
                  {watchlisted
                    ? "✓ In Watchlist"
                    : "Add to Watchlist"}
                </button>

              </div>

            </div>

          </motion.div>

        </div>

        {/* =========================
            MOVIE INFORMATION
        ========================== */}

        <motion.section
          className="movie-info-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >

          <div className="details-section-heading">
            <span className="section-label">
              DETAILS
            </span>

            <h2>
              Movie <span>Information</span>
            </h2>
          </div>

          <div className="movie-info-grid">

            <div className="movie-info-item">
              <FiFilm />
              <div>
                <span>Genre</span>
                <strong>{movie.genre}</strong>
              </div>
            </div>

            <div className="movie-info-item">
              <FiCalendar />
              <div>
                <span>Release Year</span>
                <strong>{movie.year}</strong>
              </div>
            </div>

            <div className="movie-info-item">
              <FiClock />
              <div>
                <span>Runtime</span>
                <strong>{movie.duration}</strong>
              </div>
            </div>

            <div className="movie-info-item">
              <FiStar />
              <div>
                <span>ReelRoom Rating</span>
                <strong>{movie.rating} / 10</strong>
              </div>
            </div>

            <div className="movie-info-item">
              <FiGlobe />
              <div>
                <span>Language</span>
                <strong>
                  {movie.language || "Urdu"}
                </strong>
              </div>
            </div>

            <div className="movie-info-item">
              <FiFilm />
              <div>
                <span>Director</span>
                <strong>
                  {movie.director || "Information unavailable"}
                </strong>
              </div>
            </div>

          </div>

        </motion.section>

        {/* =========================
            CAST & CREW
        ========================== */}

        {movie.cast?.length > 0 && (
          <motion.section
            className="cast-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >

            <div className="details-section-heading">
              <span className="section-label">
                CAST & CREW
              </span>

              <h2>
                Meet the <span>Cast</span>
              </h2>
            </div>

            <div className="cast-grid">

              {movie.cast.map((person, index) => (
                <motion.div
                  className="cast-card"
                  key={`${person.name}-${index}`}
                  whileHover={{ y: -5 }}
                >

                  <div className="cast-image">

                    {person.image ? (
                      <img
                        src={person.image}
                        alt={person.name}
                      />
                    ) : (
                      <span>
                        {person.name
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    )}

                  </div>

                  <div className="cast-info">
                    <h3>{person.name}</h3>

                    <p>
                      {person.character ||
                        "Cast Member"}
                    </p>
                  </div>

                </motion.div>
              ))}

            </div>

          </motion.section>
        )}

        {/* =========================
            ABOUT THE MOVIE
        ========================== */}

        <motion.section
          className="about-movie-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >

          <div className="details-section-heading">
            <span className="section-label">
              THE STORY
            </span>

            <h2>
              About the <span>Movie</span>
            </h2>
          </div>

          <p className="about-movie-text">
            {movie.longDescription ||
              movie.description}
          </p>

        </motion.section>

        {/* =========================
            YOU MAY ALSO LIKE
        ========================== */}

        {similarMovies.length > 0 && (
          <section className="related-movies-section">

            <div className="details-section-heading">

              <span className="section-label">
                MORE LIKE THIS
              </span>

              <h2>
                You May <span>Also Like</span>
              </h2>

            </div>

            <div className="related-movies-grid">

              {similarMovies.map((similarMovie) => (
                <Link
                  to={`/movie/${similarMovie.id}`}
                  key={similarMovie.id}
                  className="related-movie-card"
                >

                  <div className="related-movie-image">
                    <img
                      src={similarMovie.image}
                      alt={similarMovie.title}
                    />

                    <div className="related-movie-overlay">
                      <FiPlay />
                    </div>
                  </div>

                  <div className="related-movie-info">

                    <h3>{similarMovie.title}</h3>

                    <div>
                      <span>
                        {similarMovie.year}
                      </span>

                      <span>
                        {similarMovie.genre}
                      </span>

                      <strong>
                        <FiStar />
                        {similarMovie.rating}
                      </strong>
                    </div>

                  </div>

                </Link>
              ))}

            </div>

          </section>
        )}

        {/* =========================
            EXPLORE MORE
        ========================== */}

        <section className="related-movies-section explore-more-section">

          <div className="details-section-heading">

            <span className="section-label">
              REELROOM COLLECTION
            </span>

            <h2>
              Explore <span>More</span>
            </h2>

          </div>

          <div className="related-movies-grid">

            {moreMovies.map((moreMovie) => (
              <Link
                to={`/movie/${moreMovie.id}`}
                key={moreMovie.id}
                className="related-movie-card"
              >

                <div className="related-movie-image">

                  <img
                    src={moreMovie.image}
                    alt={moreMovie.title}
                  />

                  <div className="related-movie-overlay">
                    <FiPlay />
                  </div>

                </div>

                <div className="related-movie-info">

                  <h3>{moreMovie.title}</h3>

                  <div>

                    <span>
                      {moreMovie.year}
                    </span>

                    <span>
                      {moreMovie.genre}
                    </span>

                    <strong>
                      <FiStar />
                      {moreMovie.rating}
                    </strong>

                  </div>

                </div>

              </Link>
            ))}

          </div>

        </section>

      </div>

      {/* =========================
          TRAILER MODAL
      ========================== */}

      {trailerOpen && (
        <div
          className="trailer-modal"
          onClick={() =>
            setTrailerOpen(false)
          }
        >

          <div
            className="trailer-modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="trailer-close"
              onClick={() =>
                setTrailerOpen(false)
              }
              aria-label="Close trailer"
            >
              ×
            </button>

            {movie.trailer ? (
              <div className="trailer-video">

                <iframe
                  src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=1`}
                  title={`${movie.title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>

              </div>
            ) : (
              <div className="trailer-placeholder">

                <FiPlay />

                <h2>
                  Trailer Coming Soon
                </h2>

                <p>
                  The trailer for{" "}
                  {movie.title} is not available
                  yet.
                </p>

              </div>
            )}

          </div>

        </div>
      )}

    </section>
  );
}

export default MovieDetails;