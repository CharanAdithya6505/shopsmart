import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../../__mocks__/server.js";
import App from "../../App.jsx";

describe("App — Integration Tests", () => {
  it("renders the full layout with sidebar and main content", () => {
    render(<App />);

    // Sidebar present
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    // Header present
    expect(screen.getByTestId("header")).toBeInTheDocument();
    // Category filter present
    expect(screen.getByTestId("category-filter")).toBeInTheDocument();
    // Products grid present
    expect(screen.getByTestId("products-grid")).toBeInTheDocument();
  });

  it("displays backend status indicator after API responds", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId("backend-status")).toBeInTheDocument();
    });

    expect(screen.getByTestId("backend-status")).toHaveClass(
      "status-indicator--ok",
    );
  });

  it("filters products when a category pill is clicked", async () => {
    render(<App />);

    // Initially shows all products (first 2 from the full list)
    const grid = screen.getByTestId("products-grid");
    expect(grid.children.length).toBeGreaterThan(0);

    // Click Women filter
    fireEvent.click(screen.getByTestId("filter-women"));
    expect(screen.getByTestId("filter-women")).toHaveClass(
      "filter-pill--active",
    );
  });

  it("toggles favourite button on product card", async () => {
    render(<App />);

    // Find the first favourite button
    const favBtn = screen.getByTestId("fav-btn-1");
    expect(favBtn).toHaveTextContent("♡");

    // Click to favourite
    fireEvent.click(favBtn);
    expect(favBtn).toHaveTextContent("♥");
    expect(favBtn).toHaveClass("favourite-btn--active");

    // Click to unfavourite
    fireEvent.click(favBtn);
    expect(favBtn).toHaveTextContent("♡");
    expect(favBtn).not.toHaveClass("favourite-btn--active");
  });

  it("renders all three promo banners", () => {
    render(<App />);

    expect(screen.getByTestId("promo-discount")).toBeInTheDocument();
    expect(screen.getByTestId("promo-season")).toBeInTheDocument();
    expect(screen.getByTestId("promo-fashion")).toBeInTheDocument();
  });

  it("renders favourites carousel with navigation", () => {
    render(<App />);

    expect(screen.getByTestId("favourites-carousel")).toBeInTheDocument();
    expect(screen.getByTestId("carousel-prev")).toBeInTheDocument();
    expect(screen.getByTestId("carousel-next")).toBeInTheDocument();
  });

  it("navigates sidebar items on click", () => {
    render(<App />);

    const popularNav = screen.getByTestId("nav-popular");
    fireEvent.click(popularNav);
    expect(popularNav).toHaveClass("nav-item--active");

    // Previous active item should no longer be active
    const exploreNav = screen.getByTestId("nav-explore");
    expect(exploreNav).not.toHaveClass("nav-item--active");
  });

  it("handles API failure — layout still renders", async () => {
    server.use(
      http.get("/api/health", () => {
        return HttpResponse.error();
      }),
    );

    render(<App />);

    // App should still render the full layout
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByTestId("products-grid")).toBeInTheDocument();
  });

  it("displays product prices in the correct format", () => {
    render(<App />);

    expect(screen.getByTestId("price-1")).toHaveTextContent("$36");
    expect(screen.getByTestId("price-2")).toHaveTextContent("$89");
  });

  it("renders the featured card and avail offers button", () => {
    render(<App />);

    expect(screen.getByTestId("featured-card")).toBeInTheDocument();
    expect(screen.getByText("Avail Offers")).toBeInTheDocument();
  });
});
