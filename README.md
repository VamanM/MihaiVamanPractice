# QA Automation Assessment

Candidate: Mihai Vaman

This repository contains my solution for the QA Engineer pre-interview assessment.

## Cypress version
15.13.0

## Installation
npm install

## Run tests
npm run cy:open

After Cypress opens in a separate window, select E2E Testing, choose Chrome, and click Start. 
Once the browser opens, run the "airportlabs" spec file.

## Structure
- cypress/e2e/airportlabs - AirportLabs test scenarios
- cypress/fixtures - fixture data
- cypress/pages - page object files
- cypress/support - support files and custom commands