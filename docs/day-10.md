CI/CD, Jenkins, Docker & Environment Management
===============================================
npm install vs npm ci
    npm install
        Developing
        Adding/updating dependencies

    npm ci
       package-lock.json 


Jenkins Agent
    ↓
Node/npm
    ↓
Playwright package
    ↓
Browser binaries
    ↓
Tests

A mature QE pipeline might look like:
    Checkout
        ↓
    Install
        ↓
    Lint / Type Check
        ↓
    Smoke
        ↓
    API Tests
        ↓
    UI Regression
        ↓
    E2E Critical Tests
        ↓
    Publish Reports

Without docker:
    Jenkins Agent
        ├── Node version
        ├── Browser version
        ├── OS dependencies
        ├── npm packages
        └── Playwright version
Docker provides a more consistent execution environment.
     Docker Image
        ├── OS
        ├── Node
        ├── Playwright
        ├── Browser dependencies
        └── Test framework      

Docker helps with:
    environment consistency
    dependency management
    reproducibility
    scaling CI workers

But it does not automatically solve:
    bad test data
    flaky tests
    application instability
    poor locators
    race conditions
    environment capacity
    shared DB state 

Playwright Docker Strategy
    Playwright Docker Image
            │
            ├── Node
            ├── Playwright
            ├── Browsers
            └── Dependencies
                    │
                    ↓
                 Test Suite

Jenkins + Docker + Playwright
                    Jenkins
                       │
                 Pipeline Trigger
                       │
                 ┌─────┴─────┐
                 ↓           ↓
             Container    Container
                 #1            #2
                 │             │
              Worker        Worker
                 │             │
               Tests         Tests
                 └──────┬──────┘
                        ↓
                    Reports

For example, if you have 1,000 regression tests and want 2 containers: Container 1 → Shard 1/2 → roughly half the tests
            Container 2 → Shard 2/2 → roughly the other half

            npx playwright test --shard=1/2 
            and
            npx playwright test --shard=2/2

            Jenkins
                │
                ├── Container 1
                │     └── npx playwright test --shard=1/2
                │
                └── Container 2
                        └── npx playwright test --shard=2/2


                        Container 1
                        ├── Worker 1
                        ├── Worker 2
                        └── Worker 3

                        Container 2
                        ├── Worker 1
                        ├── Worker 2
                        └── Worker 3

    So there are two levels of parallelism:
        Sharding = split the overall suite across machines/containers.
        Workers = parallelize tests within each container.

Failure Flow
    Test fails
        ↓
    Retry
        ↓
    Still fails?
        │
        ├── NO → mark passed-after-retry
        │
        └── YES
                ↓
            Capture
            Trace
            Screenshot
            Video
                ↓
            Publish
                ↓
            Investigate

==========================================================
| Metric                      | Why                      |
| --------------------------- | ------------------------ |
| Pass rate                   | Overall execution health |
| First-pass pass rate        | Stability                |
| Retry rate                  | Flakiness indicator      |
| Automation execution time   | Pipeline efficiency      |
| Failure rate by application | Quality hotspots         |
| Failure categories          | Root-cause analysis      |
| Defect escape rate          | Effectiveness            |
| Automation coverage         | Scope                    |
| CI pipeline duration        | Delivery efficiency      |
==========================================================