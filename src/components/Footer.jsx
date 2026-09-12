import { useNavigate } from "react-router-dom";
function Footer() {
    const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goMovies = () => {
    navigate("/movies");
  };

  const goWatchlist = () => {
    navigate("/watchlist");
  };

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const goToSection = (section) => {
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
    <footer className="footer">
      <div className="container">

        <div className="footer-main">

          {/* BRAND */}
          <div className="footer-brand">

            <button
              className="footer-logo"
              onClick={goHome}
            >
              <span>▶</span>
              REEL<span>ROOM</span>
            </button>

            <p>
              A digital cinema room where every movie
              has its own atmosphere.
            </p>

            <button
              className="footer-explore"
              onClick={goMovies}
            >
              Explore Movies
              <span>↗</span>
            </button>

          </div>


          {/* NAVIGATION */}
          <div className="footer-column">

            <h4>NAVIGATION</h4>

            <button onClick={goHome}>
              Home
            </button>

            <button onClick={goMovies}>
              Movies
            </button>

            <button onClick={goWatchlist}>
              Watchlist
            </button>

          </div>


          
{/* DISCOVER */}
<div className="footer-column">
  <h4>DISCOVER</h4>

  <button onClick={() => goToSection("genres")}>
    Browse Genres
  </button>

  <button onClick={() => goToSection("trending")}>
    Trending Now
  </button>

  <button onClick={() => goToSection("latest")}>
    Latest Movies
  </button>
</div>


          {/* REELROOM */}
          <div className="footer-column">

            <h4>REELROOM</h4>

            <button onClick={goHome}>
              About ReelRoom
            </button>

            <button onClick={goMovies}>
              Explore
            </button>

            <button onClick={backToTop}>
              Back to Top ↑
            </button>

          </div>

        </div>


        {/* BOTTOM */}
        <div className="footer-bottom">

          <p>
            © 2026 ReelRoom. All rights reserved.
          </p>

          <span>
            MADE FOR MOVIE LOVERS
          </span>

          <button
            className="footer-top"
            onClick={backToTop}
            aria-label="Back to top"
          >
            ↑
          </button>

        </div>

      </div>
    </footer>
  );
}

export default Footer;