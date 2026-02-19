import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import PromoBanner from "./components/PromoBanner";
import FavouritesCarousel from "./components/FavouritesCarousel";
import { products } from "./data/products";

function App() {
  const [backendStatus, setBackendStatus] = useState(null);
  const [activeNav, setActiveNav] = useState("explore");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    fetch(`${apiUrl}/api/health`)
      .then((res) => res.json())
      .then((data) => setBackendStatus(data.status))
      .catch((err) => console.error("Error fetching health check:", err));
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (p) => p.category === activeCategory.toLowerCase(),
        );

  return (
    <div className="app-layout" data-testid="app-layout">
      <Sidebar activeNav={activeNav} onNavClick={setActiveNav} />

      <main className="main-content">
        <Header orderCount={37} backendStatus={backendStatus} />

        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Main Grid */}
        <div className="content-grid">
          {/* Left column: Promo banners */}
          <div className="grid-left">
            <PromoBanner variant="discount" />
            <PromoBanner variant="season" />

            {/* Bottom row: featured + favourites */}
            <div className="bottom-row">
              <div className="featured-card" data-testid="featured-card">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=400&fit=crop"
                  alt="Featured fashion"
                  className="featured-image"
                  loading="lazy"
                />
                <button className="featured-heart">♡</button>
                <button className="featured-cta">Avail Offers</button>
              </div>
              <FavouritesCarousel />
            </div>
          </div>

          {/* Right column: Product cards */}
          <div className="grid-right">
            <div className="products-grid" data-testid="products-grid">
              {filteredProducts.slice(0, 2).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <PromoBanner variant="fashion" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
