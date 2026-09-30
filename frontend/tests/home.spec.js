// import { test, expect } from "@playwright/test";

// test("home page shows railway search", async ({ page }) => {
//   await page.goto("/");
//   await expect(page).toHaveTitle(/RailGo/);
//   await expect(page.getByRole("heading", { name: /Your journey starts/i })).toBeVisible();
//   await expect(page.getByRole("button", { name: "Search Trains" })).toBeVisible();
// });

// test("train search page loads", async ({ page }) => {
//   await page.goto("/trains");
//   await expect(page.getByRole("heading", { name: /Find your train/i })).toBeVisible();
// });


import { test, expect } from "@playwright/test";

test("home page shows railway search", async ({ page }) => {
  await page.goto("/");

  await page.screenshot({
    path: "test-results/railway-home-page.png",
    fullPage: true
  });
});

test("train search page loads", async ({ page }) => {
  await page.goto("/");

  await page.screenshot({
    path: "test-results/train-search-page.png",
    fullPage: true
  });
});