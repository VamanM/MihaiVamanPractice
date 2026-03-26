# TEST_DESIGN

## 1. Why I structured the project this way

I used Cypress with JavaScript and organized the project around Page Object Model to keep the test code readable and easier to maintain.

The project is split by feature:
- `airportlabs` for Part 1
- `shopping` for Part 2

This separation keeps each flow isolated and avoids mixing selectors and logic from different websites.

I kept:
- `e2e` for test scenarios
- `pages` for page object files
- `fixtures` for test data
- `support` for shared Cypress setup and commands

For Part 1, I used:
- page objects for navigation and reusable selectors
- one fixture-based test for the statistic validation
- one negative assertion for the logo scenario

For Part 2, I used:
- reusable methods for filtering, stock selection, sorting, and add-to-cart flow
- parameterized methods for rating, brand, and sorting
- separate cart validations for brand, individual prices, and total

The main goal of this structure was clarity, reuse, and keeping selectors centralized.

## 2. What I would add if I had 2 more hours

If I had 2 more hours, I would improve the project in the following areas:

### Stability improvements
- reduce the number of explicit waits and replace more of them with condition-based waits
- make some selectors more resilient where the target website is highly dynamic
- add safer handling for optional popups or banners

### Reusability improvements
- extract repeated price parsing logic into a small utility/helper
- make product card selection reusable by index instead of always using the first product
- improve some shared methods so they can support more brands and categories with less duplication

### Test coverage improvements
- add assertions that the selected filters remain active after applying them
- verify that sorting really changed product order, not only that the selected option was clicked
- add one negative shopping scenario, for example verifying behavior when no products match a filter combination

### Reporting / maintainability
- add comments only where the business logic is not immediately obvious
- add npm scripts for running specific specs
- optionally add a lightweight reporter setup for clearer output in CI

## 3. What is easier to maintain and what is more fragile

### Easier to maintain
The AirportLabs part is easier to maintain because:
- the flow is short and predictable
- the page structure is simpler
- the assertions are direct
- selectors are relatively stable

The overall project structure is also easy to maintain because tests are separated by feature and page objects are isolated.

### More fragile
The shopping flow is more fragile because:
- the target site is dynamic
- some UI elements load progressively
- filters and sorting depend on the current DOM structure
- add-to-cart controls may vary between products
- pricing is split into multiple DOM elements and must be reconstructed before comparison

The most fragile parts are:
- dynamic e-commerce selectors
- modal/popup timing
- sorting dropdown interaction
- cart row targeting by position

Because of this, I prioritized working selectors, reusable flow methods, and validations that match the actual rendered UI.

## 4. Main assumptions made

### Part 1
- the current AirportLabs DOM structure and visible values are valid for the assessment period
- the selected section and product links remain available
- the blog page title keeps the same styling values used in the test

### Part 2
- eMAG was selected as the public shopping site for this exercise
- a Samsung remote control was treated as the accessory product
- the first product after filtering and sorting is the one to validate and add to cart
- price validation is based on the displayed whole value and decimal value from the UI
- total validation is based on the same displayed values from the cart summary

## 5. Trade-offs

I intentionally preferred:
- readable code over overengineering
- stable explicit selectors over overly generic selectors
- a few controlled waits over flaky interactions on a dynamic shopping site

If this were a longer-term production framework, I would invest more in:
- utilities
- custom commands for reusable flows
- smarter synchronization
- reusable data builders
- CI-oriented reporting