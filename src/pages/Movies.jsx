import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiArrowLeft } from "react-icons/fi";
import MovieCard from "../components/MovieCard";
import movies from "../data/movies";


function Movies() {
  const [searchParams] = useSearchParams();

const [search, setSearch] = useState(
  searchParams.get("search") || ""
);

const [genre, setGenre] = useState(
  searchParams.get("genre") || "All"
);

  const genres = ["All", ...new Set(movies.map((movie) => movie.genre))];

  const filteredMovies = movies.filter((movie) => {
  const searchValue = search.toLowerCase().trim();

  const matchesSearch =
    !searchValue ||
    movie.title.toLowerCase().includes(searchValue) ||
    movie.genre.toLowerCase().includes(searchValue) ||
    movie.cast?.some((person) =>
      person.name.toLowerCase().includes(searchValue)
    );

  const matchesGenre =
    genre === "All" ||
    movie.genre.toLowerCase() === genre.toLowerCase();

  return matchesSearch && matchesGenre;
});

  return (
    <section className="movies-page">
      <div className="container">

        {/* Page Header */}
        <motion.div
          className="movies-header"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="section-label">REELROOM COLLECTION</span>

            <h1>
              Explore <span>Movies</span>
            </h1>

            <p>
              Discover cinematic worlds, unforgettable stories,
              and movies worth watching.
            </p>
          </div>

          <div className="movies-count">
            <strong>{filteredMovies.length}</strong>
            <span>Movies</span>
          </div>
        </motion.div>
<Link to="/" className="back-movies">
  <FiArrowLeft />
  Back to Home
</Link>
        {/* Filters */}
        <div className="movies-tools">

          <div className="movie-search">
            <FiSearch />

            <input
  id="movie-search"
  type="text"
  placeholder="Search movies..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
          </div>

          <div className="genre-filter">
            <FiFilter />

            {genres.map((item) => (
              <button
                key={item}
                className={
  genre.toLowerCase() === item.toLowerCase()
    ? "active"
    : ""
}
                onClick={() => setGenre(item)}
              >
                {item}
              </button>
            ))}
          </div>

        </div>

        {/* Movie Grid */}
        {filteredMovies.length > 0 ? (
          <motion.div className="movies-grid">
            {filteredMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="no-movies">
            <h2>No movies found</h2>
            <p>Try searching for another movie.</p>
          </div>
        )}

      </div>
    </section>
  );
}

export default Movies;