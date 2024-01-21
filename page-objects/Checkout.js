import { expect } from "@playwright/test";

export class Checkout {
  constructor(page) {
    this.page = page;

    // locators
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]');
    this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');
    this.registerButton = page.locator('[data-qa="go-to-signup-button"]');
  }

  removeCheapesProduct = async () => {
    // Wait for items to appear in the basket
    await this.basketCards.first().waitFor();
    const itemsBeforeRemoval = await this.basketCards.count();

    await this.basketItemPrice.first().waitFor();

    // Save all innter texts from all elements to a list
    const allPriceTexts = await this.basketItemPrice.allInnerTexts();

    // Print {variable: value} in the log
    console.warn({ allPriceTexts });

    const justNumbers = allPriceTexts.map((element) => {
      const withoutDollarSign = element.replace("$", "");
      return parseInt(withoutDollarSign, 10);
    });
    const smallestPrice = Math.min(...justNumbers);
    const smallestPriceIndex = justNumbers.indexOf(smallestPrice);

    const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIndex);
    await specificRemoveButton.waitFor();
    await specificRemoveButton.click();
    await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1);
  };

  continueToCheckout = async () => {
    await this.continueToCheckoutButton.waitFor();
    await this.continueToCheckoutButton.click();
    // RegExp matching for part of the url
    await this.page.waitForURL(/\/login/, { timeout: 3000 });
  };

  continueToRegister = async () => {
    await this.registerButton.waitFor();
    await this.registerButton.click();
    await this.page.waitForURL(/\/signup/, { timeout: 3000 });
  };
}
