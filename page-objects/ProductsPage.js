import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";
import { isDesktopViewport } from "../utils/isDesktop";

export class ProductsPage {
  constructor(page) {
    this.page = page;

    // locators
    this.addButtons = page.locator('[data-qa="product-button"]');
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
    this.productName = page.locator('[data-qa="product-title"]');
  }

  visit = async () => {
    await this.page.goto("/");
  };

  addProductToBasket = async (index) => {
    // Create a new object from Navigation class
    const navigation = new Navigation(this.page);

    const specificAddButton = this.addButtons.nth(index);

    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText("Add to Basket");

    let basketCountBeforeAdding; // Define value before if {}
    // Should run only on desktop viewport
    if (isDesktopViewport(this.page)) {
      basketCountBeforeAdding = await navigation.getBasketCount();
    }

    await specificAddButton.click();

    await expect(specificAddButton).toHaveText("Remove from Basket");

    if (isDesktopViewport(this.page)) {
      const basketCountAfterAdding = await navigation.getBasketCount();
      expect(basketCountAfterAdding).toEqual(basketCountBeforeAdding + 1);
    }
  };

  sortByCheapest = async () => {
    await this.sortDropdown.waitFor();
    const productsList = await this.productName.allInnerTexts();

    await this.productName;
    await this.sortDropdown.selectOption("price-asc");
    const productsListAscending = await this.productName.allInnerTexts();
    await expect(productsListAscending).not.toEqual(productsList);
  };
}
