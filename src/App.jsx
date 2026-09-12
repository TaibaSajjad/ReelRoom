import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter basename="/ReelRoom">

      {/* FULL PAGE BACKGROUND */}
      <div className="page-bg">
        <div className="page-bg-overlay"></div>
      </div>

      <div className="app-content">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <style>{`
        /* ========================================
           FIXED CINEMATIC BACKGROUND
        ======================================== */

        .page-bg {
  position: fixed;
  inset: 0;

  width: 100%;
  height: 100%;

  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  background-image: url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  opacity: 0.30;
  filter: blur(12px);
  transform: scale(1.05);
}

        .page-bg-overlay {
          position: absolute;
          inset: 0;

          background: rgba(5, 7, 9, 0.55);
        }

        /* Website content ABOVE background */
        .app-content {
          position: relative;
          z-index: 1;
        }

        /* Transparent pages */
        main,
        .home-page,
        .movies-page,
        .movie-details,
        .watchlist-page,
        .home-section,
        .latest-section,
        .trending-section,
        .coming-soon-section,
        .collections-section,
        .language-section {
          background: transparent !important;
        }
      `}</style>

    </BrowserRouter>
  );
}

export default App;