import { test } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "../page-objects/Navigation";
import { Checkout } from "../page-objects/Checkout";
import { LoginPage } from "../page-objects/LoginPage";
import { RegisterPage } from "../page-objects/RegisterPage";
import { DeliveryDetails } from "../page-objects/DeliveryDetails";
import { deliveryDetails as userAddress } from "../data/deliveryDetails";
import { paymentDetails } from "../data/paymentDetails";
import { PaymentPage } from "../page-objects/PaymentPage";

test("New user full end-to-end test journey", async ({ page }) => {
  // Create a new instances of page objects
  const productsPage = new ProductsPage(page);
  const navigation = new Navigation(page);
  const checkout = new Checkout(page);
  const login = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  const deliveryDetails = new DeliveryDetails(page);
  const paymentPage = new PaymentPage(page);

  // Create email and password
  const emailId = uuidv4();
  const email = emailId + "@mail.com";
  const password = uuidv4();

  await productsPage.visit();

  await productsPage.sortByCheapest();

  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);

  await navigation.goToCheckout();
  await checkout.removeCheapesProduct();

  await checkout.continueToCheckout();
  await login.continueToRegister();
  await registerPage.signUpAsNewUser(email, password);

  await deliveryDetails.fillDetails(userAddress);
  await deliveryDetails.saveDetails();

  await deliveryDetails.continueToPayment();

  await paymentPage.activateDiscount();

  await paymentPage.filllPaymentDetails(paymentDetails);
  await paymentPage.completePayment();
});
