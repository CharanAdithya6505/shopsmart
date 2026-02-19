import { navItems, recentOrders } from "../data/products";

function Sidebar({ activeNav, onNavClick }) {
  return (
    <aside className="sidebar" data-testid="sidebar">
      <div className="sidebar-logo">
        <h2>ShopSmart</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeNav === item.id ? "nav-item--active" : ""}`}
            onClick={() => onNavClick(item.id)}
            data-testid={`nav-${item.id}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-section">
        <p className="sidebar-section-title">Quick actions</p>
        <button className="quick-action">
          <span>+</span> Request for product
        </button>
        <button className="quick-action">
          <span>+</span> Add member
        </button>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-title">
          Last orders <strong>37</strong>
        </p>
        {recentOrders.map((order) => (
          <div key={order.id} className="recent-order">
            <div className="order-avatar" />
            <span className="order-name">{order.name}</span>
            <a href="#" className="order-action">
              {order.action}
            </a>
          </div>
        ))}
        <a href="#" className="see-all-link">
          See all
        </a>
      </div>

      <button className="logout-btn" data-testid="logout-btn">
        <span>↩</span> Log out
      </button>
    </aside>
  );
}

export default Sidebar;
