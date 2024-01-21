import { expect } from "@playwright/test";

export class RegisterPage {
  constructor(page) {
    this.page = page;

    // locators
    this.registerButton = page.locator('[data-qa="go-to-signup-button"]');
    this.emailField = page.getByPlaceholder("E-Mail");
    this.passwordField = page.getByPlaceholder("Password");
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  signUpAsNewUser = async (email, password) => {
    await this.emailField.waitFor();
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.registerButton.click();
  };
}
