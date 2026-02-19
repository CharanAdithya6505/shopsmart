function Header({ orderCount, backendStatus }) {
  return (
    <header className="header" data-testid="header">
      <div className="header-left">
        <div className="header-orders">
          <span className="order-count">{orderCount}</span>
          <div className="order-meta">
            <span className="order-label">Orders</span>
            <span className="order-period">Last 7 days</span>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="header-toggle">
          <button className="toggle-btn toggle-btn--active">Dashboard</button>
          <button className="toggle-btn">Website</button>
        </div>
      </div>

      <div className="header-right">
        {backendStatus && (
          <span
            className={`status-indicator ${backendStatus === "ok" ? "status-indicator--ok" : "status-indicator--error"}`}
            data-testid="backend-status"
            title={`Backend: ${backendStatus}`}
          >
            ●
          </span>
        )}
        <button className="header-icon-btn" data-testid="cart-btn">
          🛒 <span className="cart-label">Cart</span>
        </button>
        <div className="header-avatars">
          <div className="avatar avatar--1" />
          <div className="avatar avatar--2" />
          <div className="avatar avatar--3" />
          <span className="avatar-more">+8</span>
        </div>
        <div className="header-user">
          <div className="user-avatar" />
          <span className="user-name">Ryana</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
