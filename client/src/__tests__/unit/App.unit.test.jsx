import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../../App.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Header from "../../components/Header.jsx";
import CategoryFilter from "../../components/CategoryFilter.jsx";
import ProductCard from "../../components/ProductCard.jsx";
import PromoBanner from "../../components/PromoBanner.jsx";

// ─── Sidebar Unit Tests ──────────────────────────────────
describe("Sidebar", () => {
  it("renders the ShopSmart logo", () => {
    render(<Sidebar activeNav="explore" onNavClick={() => {}} />);
    expect(screen.getByText("ShopSmart")).toBeInTheDocument();
  });

  it("renders all navigation items", () => {
    render(<Sidebar activeNav="explore" onNavClick={() => {}} />);
    expect(screen.getByText("Popular Products")).toBeInTheDocument();
    expect(screen.getByText("Explore New")).toBeInTheDocument();
    expect(screen.getByText("Clothing and Shoes")).toBeInTheDocument();
    expect(screen.getByText("Gifts and Living")).toBeInTheDocument();
    expect(screen.getByText("Inspiration")).toBeInTheDocument();
  });

  it("highlights the active navigation item", () => {
    render(<Sidebar activeNav="explore" onNavClick={() => {}} />);
    const activeItem = screen.getByTestId("nav-explore");
    expect(activeItem).toHaveClass("nav-item--active");
  });

  it("renders the logout button", () => {
    render(<Sidebar activeNav="explore" onNavClick={() => {}} />);
    expect(screen.getByTestId("logout-btn")).toBeInTheDocument();
  });
});

// ─── Header Unit Tests ───────────────────────────────────
describe("Header", () => {
  it("renders the order count", () => {
    render(<Header orderCount={37} backendStatus={null} />);
    expect(screen.getByText("37")).toBeInTheDocument();
  });

  it("renders the cart button", () => {
    render(<Header orderCount={37} backendStatus={null} />);
    expect(screen.getByTestId("cart-btn")).toBeInTheDocument();
  });

  it("renders Dashboard and Website toggle buttons", () => {
    render(<Header orderCount={37} backendStatus={null} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Website")).toBeInTheDocument();
  });

  it("shows backend status indicator when status is provided", () => {
    render(<Header orderCount={37} backendStatus="ok" />);
    const indicator = screen.getByTestId("backend-status");
    expect(indicator).toHaveClass("status-indicator--ok");
  });
});

// ─── CategoryFilter Unit Tests ───────────────────────────
describe("CategoryFilter", () => {
  it("renders the Explore title", () => {
    render(
      <CategoryFilter activeCategory="All" onCategoryChange={() => {}} />,
    );
    expect(screen.getByText("Explore")).toBeInTheDocument();
  });

  it("renders All, Men, Women filter pills", () => {
    render(
      <CategoryFilter activeCategory="All" onCategoryChange={() => {}} />,
    );
    expect(screen.getByTestId("filter-all")).toBeInTheDocument();
    expect(screen.getByTestId("filter-men")).toBeInTheDocument();
    expect(screen.getByTestId("filter-women")).toBeInTheDocument();
  });

  it("highlights the active category", () => {
    render(
      <CategoryFilter activeCategory="Men" onCategoryChange={() => {}} />,
    );
    expect(screen.getByTestId("filter-men")).toHaveClass("filter-pill--active");
    expect(screen.getByTestId("filter-all")).not.toHaveClass(
      "filter-pill--active",
    );
  });
});

// ─── ProductCard Unit Tests ──────────────────────────────
describe("ProductCard", () => {
  const mockProduct = {
    id: 1,
    name: "Test Sandal",
    price: 36,
    category: "women",
    badge: "Our Picks",
    colors: ["#D4A574"],
    image: "/test.jpg",
  };

  it("renders product name and price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Sandal")).toBeInTheDocument();
    expect(screen.getByText("$36")).toBeInTheDocument();
  });

  it("renders the product badge", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Our Picks")).toBeInTheDocument();
  });

  it("renders favourite button", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByTestId("fav-btn-1")).toBeInTheDocument();
  });
});

// ─── PromoBanner Unit Tests ──────────────────────────────
describe("PromoBanner", () => {
  it("renders discount banner with correct text", () => {
    render(<PromoBanner variant="discount" />);
    expect(screen.getByText("GET UP TO 50% OFF")).toBeInTheDocument();
    expect(screen.getByText("Get Discount")).toBeInTheDocument();
  });

  it("renders season banner with correct text", () => {
    render(<PromoBanner variant="season" />);
    expect(screen.getByText(/Winter's weekend/)).toBeInTheDocument();
    expect(screen.getByText("keep it casual")).toBeInTheDocument();
  });

  it("renders fashion banner with correct text", () => {
    render(<PromoBanner variant="fashion" />);
    expect(screen.getByText("Bring Bold Fashion")).toBeInTheDocument();
    expect(screen.getByText("Layers on Layers")).toBeInTheDocument();
  });

  it("returns null for unknown variant", () => {
    const { container } = render(<PromoBanner variant="unknown" />);
    expect(container.innerHTML).toBe("");
  });
});
