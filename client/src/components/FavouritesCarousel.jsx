import { useState } from "react";
import { favourites } from "../data/products";

function FavouritesCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(favourites.length - visibleCount, prev + 1),
    );
  };

  const visibleItems = favourites.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="favourites-carousel" data-testid="favourites-carousel">
      <div className="favourites-header">
        <h3 className="favourites-title">Favourites</h3>
        <div className="favourites-nav">
          <button
            className="carousel-arrow"
            onClick={handlePrev}
            disabled={startIndex === 0}
            data-testid="carousel-prev"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="carousel-arrow"
            onClick={handleNext}
            disabled={startIndex >= favourites.length - visibleCount}
            data-testid="carousel-next"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
      <div className="favourites-grid">
        {visibleItems.map((item) => (
          <div key={item.id} className="favourite-item">
            <img src={item.image} alt={item.name} loading="lazy" />
          </div>
        ))}
      </div>
      <a href="#" className="see-all-link favourites-see-all">
        See All
      </a>
    </div>
  );
}

export default FavouritesCarousel;
