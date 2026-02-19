// @ts-check
import { test, expect } from "@playwright/test";

test.describe("ShopSmart Ecommerce — E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle("ShopSmart");
  });

  test("sidebar is visible with ShopSmart branding", async ({ page }) => {
    const sidebar = page.getByTestId("sidebar");
    await expect(sidebar).toBeVisible();
    await expect(sidebar.locator("h2")).toHaveText("ShopSmart");
  });

  test("sidebar navigation items are present and clickable", async ({
    page,
  }) => {
    const exploreNav = page.getByTestId("nav-explore");
    await expect(exploreNav).toBeVisible();
    await expect(exploreNav).toHaveClass(/nav-item--active/);

    // Click a different nav item
    const popularNav = page.getByTestId("nav-popular");
    await popularNav.click();
    await expect(popularNav).toHaveClass(/nav-item--active/);
    await expect(exploreNav).not.toHaveClass(/nav-item--active/);
  });

  test("header displays order count and cart", async ({ page }) => {
    const header = page.getByTestId("header");
    await expect(header).toBeVisible();
    await expect(header.locator(".order-count")).toHaveText("37");
    await expect(page.getByTestId("cart-btn")).toBeVisible();
  });

  test("category filter pills are visible and interactive", async ({
    page,
  }) => {
    const filterAll = page.getByTestId("filter-all");
    const filterMen = page.getByTestId("filter-men");
    const filterWomen = page.getByTestId("filter-women");

    await expect(filterAll).toBeVisible();
    await expect(filterMen).toBeVisible();
    await expect(filterWomen).toBeVisible();

    // Click Women filter
    await filterWomen.click();
    await expect(filterWomen).toHaveClass(/filter-pill--active/);
  });

  test("promo banners are visible with correct copy", async ({ page }) => {
    await expect(page.getByTestId("promo-discount")).toBeVisible();
    await expect(
      page.getByText("GET UP TO 50% OFF"),
    ).toBeVisible();

    await expect(page.getByTestId("promo-season")).toBeVisible();
    await expect(
      page.getByText(/Winter's weekend/),
    ).toBeVisible();
  });

  test("product cards display with prices", async ({ page }) => {
    const productsGrid = page.getByTestId("products-grid");
    await expect(productsGrid).toBeVisible();

    // Check first product price
    await expect(page.getByTestId("price-1")).toContainText("$36");
    await expect(page.getByTestId("price-2")).toContainText("$89");
  });

  test("favourite button toggles on click", async ({ page }) => {
    const favBtn = page.getByTestId("fav-btn-1");
    await expect(favBtn).toBeVisible();

    // Initially unfavourited
    await expect(favBtn).toHaveText("♡");

    // Click to favourite
    await favBtn.click();
    await expect(favBtn).toHaveText("♥");

    // Click to unfavourite
    await favBtn.click();
    await expect(favBtn).toHaveText("♡");
  });

  test("favourites carousel is present with navigation arrows", async ({
    page,
  }) => {
    const carousel = page.getByTestId("favourites-carousel");
    await expect(carousel).toBeVisible();
    await expect(page.getByTestId("carousel-prev")).toBeVisible();
    await expect(page.getByTestId("carousel-next")).toBeVisible();
  });

  test("full page layout has all major sections", async ({ page }) => {
    await expect(page.getByTestId("app-layout")).toBeVisible();
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("category-filter")).toBeVisible();
    await expect(page.getByTestId("products-grid")).toBeVisible();
    await expect(page.getByTestId("promo-discount")).toBeVisible();
    await expect(page.getByTestId("promo-fashion")).toBeVisible();
    await expect(page.getByTestId("favourites-carousel")).toBeVisible();
  });
});
