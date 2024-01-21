import { isDesktopViewport } from "../utils/isDesktop";

export class Navigation {
  constructor(page) {
    this.page = page;

    // locators
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkoutButton = page.getByRole("link", { name: "Checkout" });
    this.mobileBurgerButton = page.locator('[data-qa="burger-button"]');
  }

  getBasketCount = async () => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  };

  goToCheckout = async () => {
    // if mobile viewport, first click the hamburger
    if (!isDesktopViewport(this.page)) {
      await this.mobileBurgerButton.waitFor();
      await this.mobileBurgerButton.click();
    }

    await this.checkoutButton.waitFor();
    await this.checkoutButton.click();
    await this.page.waitForURL("/basket");
  };
}
