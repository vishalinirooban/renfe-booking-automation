🚆 Renfe & ReqRes Automation Framework 

A robust test automation solution built with Playwright and TypeScript, utilizing the Page Object Model (POM) to manage complex E2E ticketing workflows and RESTful API validations.

🏗️ Framework Architecture

The framework is designed for scalability and maintainability, separating test logic from page-specific actions.

Directory Structure
pages/: Encapsulates locators and business logic for specific pages (SearchPage, CalendarPage, ResultsPage).

tests/: Contains the test specifications and execution flows.

utils/: Shared helper functions (e.g., cookie consent handling).

test.config.ts: Centralized configuration for environment variables and base URLs.

📋 Automation Scenarios

1. UI: Renfe Ticket Purchase (End-to-End)
   
Scenario: Automated booking of a One-Way ticket from Madrid to Barcelona within a specific price range.

Dynamic Search: Simulates real user interaction using pressSequentially with delays to trigger and select from dropdown suggestions.

Calendar Logic: Handles "One Way" trip selection and uses dispatchEvent to dynamically select the current date, ensuring reliability across different browser states.

Smart Price Filtering: * Iterates through the live train list.

Data Sanitization: Implements logic to clean Spanish currency strings (e.g., converting 55,50 € to 55.50) for accurate numerical comparison.

Recursive Search: If no ticket matches the 50€ - 60€ criteria on the selected date, the script automatically navigates to the "Next Day" and re-scans until a match is found.

Fare Selection: Automates the expansion of price details and selects the "Básico" fare.

2. API: User Management (ReqRes)
   
User Creation: Validates the POST /api/register endpoint with schema assertions on the dynamic ID and username response.

Data Retrieval: Validates GET /api/users/1 to ensure API consistency and data integrity.

Enhanced Reporting: Utilizes testInfo.attach to embed full JSON response bodies directly into the Playwright HTML report for streamlined debugging.

🚀 Execution & CI Readiness

# Install dependencies
npm install

# Run all tests in headless mode
npx playwright test

📊 Reporting & Artifacts

The framework generates a comprehensive HTML Report after every run. This includes:

Trace Viewer: A frame-by-frame recording of UI interactions.

Metadata Attachments: Formatted API payloads and localized console logs.

📈 Execution Summary

<p align="center"> <img src="./images/Sample test result.jpg" width="800" alt="Playwright Test Report Summary"> </p>



Auto-Screenshot: Captured on failure for immediate visual validation.

Data Retrieval: Validates GET /api/users/1 to ensure API consistency and data integrity.

Enhanced Reporting: Utilizes testInfo.attach to embed full JSON response bodies directly into the Playwright HTML report for streamlined debugging.
