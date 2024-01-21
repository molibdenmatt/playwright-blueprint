import { expect } from "@playwright/test";

export class DeliveryDetails {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;

    // locators
    this.firstNameField = page.getByPlaceholder("First name");
    this.lastNameField = page.getByPlaceholder("Last name");
    this.streetField = page.getByPlaceholder("Street");
    this.postField = page.getByPlaceholder("Post code");
    this.cityField = page.getByPlaceholder("City");
    this.countrySelector = page.locator('[data-qa="country-dropdown"]');

    this.saveAddressButton = page.getByRole("button", { name: "Save address for next time" });
    this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]');

    // Saved Address Box data
    this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]');
    this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]');
    this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedAddressPost = page.locator('[data-qa="saved-address-postcode"]');
    this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
    this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]');

    this.continueToPaymentButton = page.getByRole("button", { name: "Continue to payment" });
  }

  fillDetails = async (userAddress) => {
    await this.firstNameField.waitFor();
    await this.firstNameField.fill(userAddress.firstName);
    await this.lastNameField.fill(userAddress.lastName);
    await this.streetField.fill(userAddress.street);
    await this.postField.fill(userAddress.post);
    await this.cityField.fill(userAddress.city);
    await this.countrySelector.selectOption(userAddress.country);
  };

  saveDetails = async () => {
    const addressCountBeforeSaving = await this.savedAddressContainer.count();

    await this.saveAddressButton.waitFor();
    await this.saveAddressButton.click();

    await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1);

    await this.savedAddressFirstName.waitFor();
    expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameField.inputValue());
    expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameField.inputValue());
    expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetField.inputValue());
    expect(await this.savedAddressPost.first().innerText()).toBe(await this.postField.inputValue());
    expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityField.inputValue());
    expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countrySelector.inputValue());
  };

  continueToPayment = async () => {
    await this.continueToPaymentButton.waitFor();
    await this.continueToPaymentButton.click();
    await this.page.waitForURL(/\/payment/, { timeout: 3000 });
  };
}
