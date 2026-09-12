import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiPlay,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
} from "react-icons/fi";


const heroMovies = [
  {
    id: 1,
    title: "THE LEGEND",
    subtitle: "OF MAULA JATT",
    rating: "8.4",
    year: "2022",
    duration: "2h 33m",
    genre: "Action",
    trailer: "pEWqOAcYgpQ",
    description:
      "A fierce warrior from Punjab faces his ruthless enemy Noori Natt in an epic tale of revenge, honor and power.",
    image:
      "https://www.impawards.com/intl/pakistan/2022/posters/legend_of_maula_jatt_xlg.jpg",
  },

  {
    id: 12,
    title: "LONDON",
    subtitle: "NAHI JAUNGA",
    rating: "6.4",
    year: "2022",
    duration: "2h 18m",
    genre: "Romance",
    trailer: "qAHhNCosiF8",
    description:
      "A romantic comedy filled with family drama, misunderstandings and a journey between Pakistan and London.",
    image:
      "https://m.media-amazon.com/images/M/MV5BOGRhNTEwNzItYTFhZi00MzYxLThkNzktYzMzMWI0NWVjNzBlXkEyXkFqcGc%40._V1_.jpg",
  },

  {
    id: 25,
    title: "SUPER",
    subtitle: "STAR",
    rating: "7.0",
    year: "2019",
    duration: "2h 30m",
    genre: "Romance",
    trailer: "A5ejkDCT1CA",
    description:
      "An aspiring actress gets her big break but discovers that fame comes with difficult choices.",
    image:
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p17202978_p_v8_ac.jpg",
  },

  {
    id: 30,
    title: "LAAL",
    subtitle: "KABOOTAR",
    rating: "7.6",
    year: "2019",
    duration: "1h 42m",
    genre: "Drama",
    trailer: "qBjTvyE4RLQ",
    description:
      "A gripping story set in Karachi where two strangers cross paths while searching for a way out of their troubled lives.",
    image:
      "https://www.impawards.com/intl/pakistan/2019/posters/laal_kabootar.jpg",
  },
];

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const movie = heroMovies[activeIndex];

  const previousIndex =
    (activeIndex - 1 + heroMovies.length) % heroMovies.length;

  const nextIndex = (activeIndex + 1) % heroMovies.length;

  const goPrevious = () => {
    setActiveIndex(previousIndex);
  };

  const goNext = () => {
    setActiveIndex(nextIndex);
  };

  return (
    <section className="hero">

      {/* Background */}
      <div className="hero-background">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.image}
            className="hero-bg-image"
            style={{
              backgroundImage: `url(${movie.image})`,
            }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        </AnimatePresence>

        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-container">

        {/* LEFT CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.title}
            className="hero-content"
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.5 }}
          >
            <span className="hero-label">
              FEATURED TONIGHT
            </span>

            <div className="hero-number">
              0{activeIndex + 1} / 04
            </div>

            <h1>
              {movie.title}
              <br />
              <span>{movie.subtitle}</span>
            </h1>

            <div className="hero-meta">
              <span className="hero-rating">
                <FiStar />
                {movie.rating}
              </span>

              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <span>{movie.genre}</span>
            </div>

            <p>{movie.description}</p>

            <div className="hero-buttons">
              <button
  className="hero-watch"
  onClick={() => setTrailerOpen(true)}
>
  <FiPlay />
  Watch Trailer
</button>

              <Link
  to={`/movie/${movie.id}`}
  className="hero-explore"
>
  Explore Movie
  <FiArrowRight />
</Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* RIGHT CAROUSEL */}
        <div className="hero-carousel-area">

          <button
            className="carousel-arrow carousel-left"
            onClick={goPrevious}
            aria-label="Previous movie"
          >
            <FiChevronLeft />
          </button>

          <div className="hero-carousel">

            {/* Previous poster */}
            <motion.button
              className="carousel-side carousel-prev"
              onClick={goPrevious}
              key={`prev-${previousIndex}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 0.45, x: 0 }}
              whileHover={{ opacity: 0.75, scale: 1.03 }}
            >
              <img
                src={heroMovies[previousIndex].image}
                alt={heroMovies[previousIndex].subtitle}
              />
            </motion.button>

            {/* Active poster */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="carousel-main"
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  rotateY: 12,
                  x: 25,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: -5,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  rotateY: -12,
                  x: -25,
                }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                }}
              >
                <img src={movie.image} alt={movie.subtitle} />

                <div className="poster-shine"></div>

                <div className="poster-info">
                  <span>{movie.genre}</span>
                  <strong>{movie.rating}</strong>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next poster */}
            <motion.button
              className="carousel-side carousel-next"
              onClick={goNext}
              key={`next-${nextIndex}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 0.5, x: 0 }}
              whileHover={{ opacity: 0.8, scale: 1.03 }}
            >
              <img
                src={heroMovies[nextIndex].image}
                alt={heroMovies[nextIndex].subtitle}
              />
            </motion.button>

          </div>

          <button
            className="carousel-arrow carousel-right"
            onClick={goNext}
            aria-label="Next movie"
          >
            <FiChevronRight />
          </button>

          {/* Dots */}
          <div className="carousel-dots">
            {heroMovies.map((item, index) => (
              <button
                key={item.subtitle}
                className={activeIndex === index ? "active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${item.subtitle}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Scroll */}
      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <div></div>
      </div>
      {/* Trailer Modal */}
      <AnimatePresence>
        {trailerOpen && (
          <motion.div
            className="trailer-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setTrailerOpen(false)}
          >
            <motion.div
              className="trailer-modal-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="trailer-close"
                onClick={() => setTrailerOpen(false)}
              >
                ×
              </button>

              <div className="trailer-video">
  <iframe
    src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=1`}
    title={`${movie.title} ${movie.subtitle} Trailer`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  ></iframe>
</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Hero;