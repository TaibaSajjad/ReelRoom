function Footer() {
  const goHome = () => {
    window.location.href = "/";
  };

  const goMovies = () => {
    window.location.href = "/movies";
  };

  const goWatchlist = () => {
    window.location.href = "/watchlist";
  };

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  <a href="/#genres">
    Browse Genres
  </a>

  <a href="/#trending">
    Trending Now
  </a>

  <a href="/#latest">
    Latest Movies
  </a>
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