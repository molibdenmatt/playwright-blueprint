import { test, expect } from "@playwright/test";

test.skip("Product Page Add To Basket", async ({ page }) => {
  await page.goto("/");

  const addToBasketButton = page
    .getByRole("button", { name: "Add to Basket" })
    .first();
  const basketCounter = page.locator('[data-qa="header-basket-count"]');

  await expect(basketCounter).toHaveText("0");
  await addToBasketButton.waitFor();
  await addToBasketButton.click();

  console.log(
    await page.getByRole("button", { name: "Add to Basket" }).count()
  );

  const addedToBasketButton = page
    .locator('[data-qa="product-button"]')
    .first();
  await expect(addedToBasketButton).toHaveText("Remove from Basket");

  await expect(basketCounter).toHaveText("1");

  const checkoutLink = page.getByRole("link", { name: "Checkout" });
  await checkoutLink.waitFor();
  await checkoutLink.click();
  await page.waitForURL("/basket");
});
