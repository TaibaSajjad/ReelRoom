import { motion } from "framer-motion";
import { useState } from "react";

import {
  FiArrowRight,
  FiTrendingUp,
  FiPlay,
  FiStar,
  FiClock,
  FiSearch,
  FiAward,
  FiGlobe,
  FiUsers,
  FiPlus,
  FiBell,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"

import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import movies, { actorImages, comingSoonMovies } from "../data/movies";

function Home() {
  const [selectedCast, setSelectedCast] = useState(null);
  const [selectedComingSoon, setSelectedComingSoon] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();
  // =====================================================
  // MOVIE DATA
  // =====================================================

  const latestMovies = movies.slice(0, 6);

  const trendingMovies = movies.slice(2, 8);

  const topPicks = [...movies]
    .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    .slice(0, 5);

  const highestRated = [...movies]
    .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    .slice(0, 6);

  const continueWatching = movies.slice(1, 5);


  const featuredPick = topPicks[0];
  const otherPicks = topPicks.slice(1, 4);

  // =====================================================
  // GENRES
  // =====================================================

  const genres = [
    { name: "ACTION", icon: "✦" },
    { name: "COMEDY", icon: "◈" },
    { name: "ROMANCE", icon: "♡" },
    { name: "DRAMA", icon: "◆" },
    { name: "MYSTERY", icon: "?" },
    { name: "ADVENTURE", icon: "△" },
    { name: "THRILLER", icon: "◇" },
    { name: "HORROR", icon: "☽" },
    { name: "CRIME", icon: "⌁" },
    { name: "SCI-FI", icon: "✧" },
  ];

  // =====================================================
  // COLLECTIONS
  // =====================================================

  const collections = [
    {
      title: "WEEKEND WATCH",
      subtitle: "Easy picks for your weekend",
      movies: movies.slice(0, 3),
    },
    {
      title: "CRIME NIGHT",
      subtitle: "Dark stories. Dangerous choices.",
      movies: movies.slice(2, 5),
    },
    {
      title: "ROMANCE PICKS",
      subtitle: "Stories made for two",
      movies: movies.slice(1, 4),
    },
    {
      title: "BEST OF REELROOM",
      subtitle: "Our most loved selections",
      movies: movies.slice(0, 4),
    },
  ];

  // =====================================================
  // POPULAR CAST
  // Uses movie posters as visual placeholders so
  // no extra image fields are required.
  // =====================================================

  const popularCast = [
  {
    name: "Mahira Khan",
    role: "Actress",
    image: actorImages["Mahira Khan"],
  },
  {
    name: "Maya Ali",
    role: "Actress",
    image: actorImages["Maya Ali"],
  },
  {
    name: "Fahad Mustafa",
    role: "Actor",
    image: actorImages["Fahad Mustafa"],
  },
  {
    name: "Fawad Khan",
    role: "Actor",
    image: actorImages["Fawad Khan"],
  },
];

  return (
  <main className="home-page">
      {/* =====================================================
          HERO
      ====================================================== */}

      <Hero />

      <section className="home-search-section">
  <div className="container">
    <motion.div
      className="home-search-box"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <FiSearch />

      <input
        type="text"
        placeholder="Search movies, actors, genres..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const value = e.target.value.trim();

            if (!value) return;

            const matchedGenre = [
              ...new Set(movies.map((movie) => movie.genre)),
            ].find(
              (genre) =>
                genre.toLowerCase() === value.toLowerCase()
            );

            if (matchedGenre) {
              navigate(
                `/movies?genre=${encodeURIComponent(matchedGenre)}`
              );
            } else {
              navigate(
                `/movies?search=${encodeURIComponent(value)}`
              );
            }
          }
        }}
      />

      <button
        type="button"
        className="home-search-button"
        onClick={(e) => {
          const input =
            e.currentTarget.parentElement.querySelector("input");

          const value = input.value.trim();

          if (!value) return;

          const matchedGenre = [
            ...new Set(movies.map((movie) => movie.genre)),
          ].find(
            (genre) =>
              genre.toLowerCase() === value.toLowerCase()
          );

          if (matchedGenre) {
            navigate(
              `/movies?genre=${encodeURIComponent(matchedGenre)}`
            );
          } else {
            navigate(
              `/movies?search=${encodeURIComponent(value)}`
            );
          }
        }}
      >
        Search
      </button>
    </motion.div>
  </div>
</section>
{/* =====================================================
    BROWSE BY GENRE
===================================================== */}

<section className="genres-section home-genres-section" id="genres">
  <div className="container">

    <div className="home-section-header">
      <div>
        <span className="section-label">
          WHAT ARE YOU IN THE MOOD FOR?
        </span>

        <h2>
          Browse by <span>Genre</span>
        </h2>
      </div>

    </div>

    <div className="genres-grid">

      {genres.map((genre, index) => (
        <motion.div
          className="genre-card"
          key={genre.name}
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.45,
            delay: index * 0.06,
          }}
          whileHover={{
            y: -6,
          }}
          onClick={() => {
  navigate(
    `/movies?genre=${encodeURIComponent(genre.name)}`
  );
}}
          style={{
            cursor: "pointer",
          }}
        >

          <span className="genre-card-number">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="genre-card-icon">
            {genre.icon}
          </div>

          <div className="genre-card-main">
            <h3>{genre.name}</h3>

            <span>
              {
                movies.filter(
                  (movie) =>
                    movie.genre?.toLowerCase() ===
                    genre.name.toLowerCase()
                ).length
              }{" "}
              Movies
            </span>
          </div>

          <FiArrowRight className="genre-arrow" />

        </motion.div>
      ))}

    </div>

  </div>
</section>
      {/* =====================================================
          CONTINUE WATCHING
      ====================================================== */}

      {continueWatching.length > 0 && (
        <section className="home-section continue-section">
          <div className="container">

            <div className="home-section-header">
              <div>
                <span className="section-label">
                  PICK UP WHERE YOU LEFT OFF
                </span>

                <h2>
                  Continue <span>Watching</span>
                </h2>
              </div>

              <Link to="/watchlist" className="view-all">
                My Watchlist
                <FiArrowRight />
              </Link>
            </div>

            <div className="continue-grid">
              {continueWatching.map((movie, index) => (
                <motion.div
                  className="continue-card"
                  key={movie.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  <div className="continue-image">
                    <img
                      src={movie.poster || movie.image}
                      alt={movie.title}
                    />

                    <div className="continue-overlay">
                      <Link
                        to={`/movie/${movie.id}`}
                        className="continue-play"
                      >
                        <FiPlay />
                      </Link>
                    </div>

                    <div className="continue-progress">
                      <span
                        style={{
                          width: `${35 + index * 14}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="continue-info">
                    <div>
                      <h3>{movie.title}</h3>

                      <span>
                        {movie.duration || "2h 10m"}
                      </span>
                    </div>

                    <span className="continue-percent">
                      {35 + index * 14}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}

      

      {/* =====================================================
          TOP PICKS
      ====================================================== */}

{featuredPick && (
  <section className="home-section top-picks-section">
    <div className="container">

      <div className="home-section-header">
        <div>
          <span className="section-label">
            HANDPICKED FOR YOU
          </span>

          <h2>
            Top <span>Picks</span>
          </h2>
        </div>

        <Link
          to="/movies"
          className="view-all"
        >
          Explore All
          <FiArrowRight />
        </Link>
      </div>

      <div className="top-picks-layout">

        <motion.div
          className="top-pick-feature"
          initial={{
            opacity: 0,
            x: -40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          onClick={() =>
            navigate(`/movie/${featuredPick.id}`)
          }
          style={{
            cursor: "pointer",
          }}
        >
          <div className="top-pick-image">
            <img
              src={
                featuredPick.poster ||
                featuredPick.image
              }
              alt={featuredPick.title}
            />

            <div className="top-pick-overlay" />

            <div className="top-pick-content">

              <span className="top-pick-badge">
                #01 TOP PICK
              </span>

              <h3>
                {featuredPick.title}
              </h3>

              <div className="top-pick-meta">
                <span>
                  <FiStar />
                  {featuredPick.rating}
                </span>

                <span>
                  {featuredPick.year}
                </span>

                <span>
                  {featuredPick.duration}
                </span>
              </div>

              <Link
                to={`/movie/${featuredPick.id}`}
                className="top-pick-button"
              >
                <FiPlay />
                Watch Movie
              </Link>

            </div>
          </div>
        </motion.div>

        <div className="top-picks-list">

          {otherPicks.map((movie, index) => (
            <motion.div
              className="top-pick-item"
              key={movie.id}
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              onClick={() =>
                navigate(`/movie/${movie.id}`)
              }
              style={{
                cursor: "pointer",
              }}
            >

              <span className="top-pick-rank">
                0{index + 2}
              </span>

              <div className="top-pick-small-image">
                <img
                  src={
                    movie.poster ||
                    movie.image
                  }
                  alt={movie.title}
                />
              </div>

              <div className="top-pick-info">

                <span className="top-pick-genre">
                  {movie.genre}
                </span>

                <h4>
                  {movie.title}
                </h4>

                <div className="top-pick-small-meta">
                  <span>
                    <FiStar />
                    {movie.rating}
                  </span>

                  <span>
                    {movie.year}
                  </span>
                </div>

              </div>

              <Link
                to={`/movie/${movie.id}`}
                className="top-pick-arrow"
              >
                <FiArrowRight />
              </Link>

            </motion.div>
          ))}

        </div>

      </div>

    </div>
  </section>
)}

      {/* =====================================================
          HIGHEST RATED
      ====================================================== */}

      <section className="home-section rated-section">
        <div className="container">

          <div className="home-section-header">
            <div>
              <span className="section-label">
                AUDIENCE FAVOURITES
              </span>

              <h2>
                Highest <span>Rated</span>
              </h2>
            </div>

            <div className="rated-heading-icon">
              <FiAward />
              <span>TOP RATED</span>
            </div>
          </div>

          <div className="home-movie-row rated-movie-row">
            {highestRated.map((movie, index) => (
              <motion.div
                className="rated-card"
                key={movie.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                <Link to={`/movie/${movie.id}`}>
                  <div className="rated-poster">

                    <img
                      src={movie.poster || movie.image}
                      alt={movie.title}
                    />

                    <div className="rated-number">
                      #{String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="rated-score">
                      <FiStar />
                      {movie.rating}
                    </div>
                  </div>

                  <h3>{movie.title}</h3>

                  <div className="rated-meta">
                    <span>{movie.year}</span>
                    <span>{movie.genre}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    

      {/* =====================================================
          LATEST MOVIES
      ====================================================== */}

      <section
        className="home-section latest-section"
        id="latest"
      >
        <div className="container">

          <div className="home-section-header">

            <div>
              <span className="section-label">
                FRESH FROM THE CINEMA
              </span>

              <h2>
                Latest <span>Movies</span>
              </h2>
            </div>

            <Link
              to="/movies"
              className="view-all"
            >
              View All
              <FiArrowRight />
            </Link>

          </div>

          <div className="home-movie-row">

            {latestMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          TRENDING NOW
      ====================================================== */}

      <section
        className="home-section trending-section"
        id="trending"
      >
        <div className="container">

          <div className="home-section-header">

            <div>
              <span className="section-label">
                WHAT EVERYONE IS WATCHING
              </span>

              <h2>
                Trending <span>Now</span>
              </h2>
            </div>

            <div className="trending-icon">
              <FiTrendingUp />
              <span>THIS WEEK</span>
            </div>

          </div>

          <div className="home-movie-row">

            {trendingMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          POPULAR CAST
      ====================================================== */}

    <section className="home-section cast-section">
  <div className="container">

    <div className="home-section-header">
      <div>
        <span className="section-label">
          MEET THE STARS
        </span>

        <h2>
          Popular <span>Cast</span>
        </h2>
      </div>
    </div>

    <div className="cast-grid">
      {popularCast.map((person, index) => (
        <motion.div
          className="cast-card"
          key={index}
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.08,
          }}
          whileHover={{
            y: -8,
          }}
          onClick={() => setSelectedCast(person)}
          style={{
            cursor: "pointer",
          }}
        >
          <div className="cast-image">
            <img
              src={person.image}
              alt={person.name}
            />

            <div className="cast-image-overlay">
              <FiUsers />
            </div>
          </div>

          <h3>{person.name}</h3>
          <span>{person.role}</span>
        </motion.div>
      ))}
    </div>

  </div>

  {/* CAST POPUP */}
  {selectedCast && (
    <div
      className="cast-modal"
      onClick={() => setSelectedCast(null)}
    >
      <div
        className="cast-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cast-modal-close"
          onClick={() => setSelectedCast(null)}
        >
          ×
        </button>

        <img
          src={selectedCast.image}
          alt={selectedCast.name}
          className="cast-modal-image"
        />

        <div className="cast-modal-info">
          <span>POPULAR CAST</span>
          <h2>{selectedCast.name}</h2>
          <p>{selectedCast.role}</p>
        </div>
      </div>
    </div>
  )}
</section>

      {/* =====================================================
          COLLECTIONS
      ====================================================== */}

      <section className="collections-section">
        <div className="container">

          <div className="home-section-header">
            <div>
              <span className="section-label">
                CURATED FOR YOUR MOOD
              </span>

              <h2>
                ReelRoom <span>Collections</span>
              </h2>
            </div>

            <Link to="/movies" className="view-all">
              All Collections
              <FiArrowRight />
            </Link>
          </div>

          <div className="collections-grid">
            {collections.map((collection, index) => (
              <motion.div
                className="collection-card"
                key={collection.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <div className="collection-posters">
                  {collection.movies.slice(0, 3).map((movie) => (
                    <img
                      key={movie.id}
                      src={movie.poster || movie.image}
                      alt={movie.title}
                    />
                  ))}
                </div>

                <div className="collection-content">
                  <span>
                    COLLECTION 0{index + 1}
                  </span>

                  <h3>{collection.title}</h3>

                  <p>{collection.subtitle}</p>

                  <Link to="/movies">
                    Explore Collection
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          COMING SOON
      ====================================================== */}
{comingSoonMovies.length > 0 && (
  <section className="coming-soon-section">
    <div className="container">

      <div className="home-section-header">

        <div>
          <span className="section-label">
            WHAT'S NEXT
          </span>

          <h2>
            Coming <span>Soon</span>
          </h2>
        </div>

        <Link
          to="/movies"
          className="view-all"
        >
          See All
          <FiArrowRight />
        </Link>

      </div>

      <div className="coming-soon-list">

        {comingSoonMovies.map((movie, index) => (
          <motion.div
            className="coming-soon-item"
            key={movie.id}
            onClick={() => setSelectedComingSoon(movie)}
            style={{ cursor: "pointer" }}
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
          >

            <div className="coming-soon-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="coming-soon-poster">
              <img
                src={
                  movie.poster ||
                  movie.image
                }
                alt={movie.title}
              />
            </div>

            <div className="coming-soon-details">

              <span className="coming-soon-label">
                COMING SOON
              </span>

              <h3>
                {movie.title}
              </h3>

              <div className="coming-soon-meta">

                <span>
                  <FiClock />
                  {movie.duration || "TBA"}
                </span>

                <span>
                  {movie.genre}
                </span>

                <span>
                  {movie.year}
                </span>

              </div>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  </section>
)}
{selectedComingSoon && (
  <div
    className="cast-modal"
    onClick={() => setSelectedComingSoon(null)}
  >

    <div
      className="cast-modal-content"
      onClick={(e) => e.stopPropagation()}
    >

      <button
        className="cast-modal-close"
        onClick={() => setSelectedComingSoon(null)}
      >
        ×
      </button>

      <img
        src={
          selectedComingSoon.poster ||
          selectedComingSoon.image
        }
        alt={selectedComingSoon.title}
        className="cast-modal-image"
      />

      <div className="cast-modal-info">

        <span>
          COMING SOON
        </span>

        <h2>
          {selectedComingSoon.title}
        </h2>

        <p>
          {selectedComingSoon.genre} •{" "}
          {selectedComingSoon.year}
        </p>

        <p>
          Release Date:{" "}
          {selectedComingSoon.releaseDate || "To Be Announced"}
        </p>

      </div>

    </div>

  </div>
)}
      </main>
  );
}

export default Home;