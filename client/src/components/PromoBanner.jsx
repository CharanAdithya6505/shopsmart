function PromoBanner({ variant }) {
  if (variant === "discount") {
    return (
      <div
        className="promo-banner promo-banner--discount"
        data-testid="promo-discount"
      >
        <div className="promo-content">
          <h2 className="promo-title">GET UP TO 50% OFF</h2>
          <button className="promo-cta">Get Discount</button>
        </div>
      </div>
    );
  }

  if (variant === "season") {
    return (
      <div
        className="promo-banner promo-banner--season"
        data-testid="promo-season"
      >
        <div className="promo-content">
          <h2 className="promo-title">Winter&apos;s weekend</h2>
          <p className="promo-subtitle">keep it casual</p>
        </div>
        <button className="promo-arrow">↗</button>
      </div>
    );
  }

  if (variant === "fashion") {
    return (
      <div
        className="promo-banner promo-banner--fashion"
        data-testid="promo-fashion"
      >
        <div className="promo-content">
          <h2 className="promo-title">Bring Bold Fashion</h2>
          <p className="promo-subtitle">Layers on Layers</p>
        </div>
        <button className="promo-arrow">↗</button>
      </div>
    );
  }

  return null;
}

export default PromoBanner;
