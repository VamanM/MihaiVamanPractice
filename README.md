# QA Automation Assessment

Candidate: Mihai Vaman

This repository contains my solution for the QA Engineer pre-interview assessment.

## Cypress version
15.13.0

## Installation
npm install

## Run tests
npm run cy:open

or

npm run cy:run

After Cypress opens in a separate window, click E2E Testing, select Chrome, and click Start. Then open the spec file you want to run.

## Project structure
- cypress/e2e/airportlabs - Part 1 test scenarios
- cypress/e2e/shopping - Part 2 shopping flow
- cypress/fixtures - fixture data for data-driven tests
- cypress/pages/airportlabs - page objects for Part 1
- cypress/pages/shopping - page objects for Part 2
- cypress/support - support files and custom commands