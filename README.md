# Playwright Udemy Course

## To start the testing app:

### run:

`./shopping-store-mac-arm64`

## Playwright

### Inside that directory, you can run several commands:

`npm i -D @playwright/test`

### install supported browsers

`npx playwright install`

### Runs the end-to-end tests.

`yarn playwright test`

### Runs the tests only on Desktop Chrome.

`yarn playwright test --project=chromium`

### Runs the tests in a specific file.

`yarn playwright test example_spec.`

### Runs the tests in debug mode.

`yarn playwright test --debug`

### Auto generate tests with Codegen.

`yarn playwright codegen`

### Open the UI mode.

`playwright test --ui`
