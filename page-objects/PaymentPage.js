import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;

    // locators
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');

    this.discountCodeField = page.locator('[data-qa="discount-code-input"]');
    this.submitDiscountButton = page.getByRole("button", {
      name: "Submit discount",
    });
    this.discountActivatedMessage = page.locator(
      '[data-qa="discount-active-message"]'
    );
    this.activeDiscountAmount = page.locator(
      '[data-qa="total-with-discount-value"]'
    );
    this.totalValue = page.locator('[data-qa="total-value"]');
    // Card details
    this.cardOwner = page.locator('[data-qa="credit-card-owner"]');
    this.cardNumber = page.locator('[data-qa="credit-card-number"]');
    this.cardValid = page.locator('[data-qa="valid-until"]');
    this.cardCvc = page.locator('[data-qa="credit-card-cvc"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
  }

  activateDiscount = async () => {
    // iFrame
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();

    await this.discountCodeField.waitFor();
    await this.discountCodeField.fill(code, { delay: 1000 });

    // Mimick pressing 1 key per second
    // await this.discountCodeField.pressSequentially(code, { delay: 1000 });
    await expect(this.discountCodeField).toHaveValue(code);

    expect(await this.activeDiscountAmount.isVisible()).toBe(false);
    await this.submitDiscountButton.waitFor();
    await this.submitDiscountButton.click();

    await expect(this.discountActivatedMessage).toBeVisible();
    let fullPrice = await this.totalValue.innerText();
    fullPrice = parseInt(fullPrice.replace("$", ""));
    let afterDiscountPrice = await this.activeDiscountAmount.innerText();
    afterDiscountPrice = parseInt(afterDiscountPrice.replace("$", ""));
    await expect(afterDiscountPrice).toBeLessThan(fullPrice);
  };

  filllPaymentDetails = async (paymentDetails) => {
    await this.cardOwner.waitFor();
    await this.cardOwner.fill(paymentDetails.cardOwner);
    await this.cardNumber.fill(paymentDetails.cardNumber);
    await this.cardValid.fill(paymentDetails.validUntil);
    await this.cardCvc.fill(paymentDetails.codeCvc);
  };

  completePayment = async () => {
    await this.payButton.waitFor();
    await this.payButton.click();
    await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
  };
}
