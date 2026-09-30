# Generate Playwright Test

Create a Playwright TypeScript test based on the supplied requirement.

Before generating code:

1. Identify the business scenario.
2. Identify positive, negative and boundary cases where applicable.
3. Identify required test data.
4. Determine whether test data should be created through API.
5. Identify UI validations.
6. Identify whether DB validation is actually necessary.

Follow the repository's Playwright architecture.

Rules:

- Use existing Page Objects and fixtures.
- Prefer getByRole and getByLabel.
- Do not use XPath unless justified.
- Do not use waitForTimeout.
- Use Playwright assertions.
- Keep the test independent.
- Do not create unnecessary abstractions.
- Do not weaken assertions to make the test pass.

Return:
1. Test scenarios
2. Recommended test design
3. Playwright implementation
4. Assumptions