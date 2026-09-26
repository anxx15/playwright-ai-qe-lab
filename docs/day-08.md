Enterprise E2E Architecture
===========================
typical banking/payment flow:

                        TEST
                        │
                ┌───────┴───────┐
                │               │
                UI              API
                │               │
        Page Objects       API Clients
                │               │
            Playwright       HTTP Service
                │               │
                └───────┬───────┘
                        │
                        DB
                        │
                Repositories
                        │
                    Database


The test framework that supports:
                        FIXTURES
                           │
            ┌──────────────┼──────────────┐
            │              │              │
        Browser          API            DB
        Context        Client          Client
            │              │              │
            └──────────────┼──────────────┘
                           │
                        Test Data

test isolation problem(same test data for aal tests):
    Test A modifies TX12345
    Test B reads TX12345
    Test C deletes TX12345
    Test D fails


Enterprise Flow Example:
                TEST
                │
            Create EFT via API
                │
            transactionId
                │
            ┌──────┴──────┐
            │             │
        DB             UI
            │             │
    Validate             Search
    persistence          transaction
            │             │
            └──────┬──────┘
                │
            Final validation 

Test
 │
 ├── API → Create test data
 │
 ├── UI → Validate user-facing behavior
 │
 └── DB → Validate persistence

Test Data Factory as a controlled way to generate test data dynamically rather than hardcoding data inside tests:
    Unique — avoid collisions between parallel tests
    Reusable — different tests can request the same type of data
    Dynamic — generate IDs, names, dates, etc.
    Environment-aware — generate data appropriate for DEV/QA/UAT
    Maintainable — data-generation logic lives in one place
    Parallel-safe — tests shouldn't depend on shared hardcoded records

    I use a Test Data Factory to decouple test data generation from test logic. Instead of hardcoding customer, transaction, or account data in individual tests, the factory generates controlled, unique and reusable data objects. Those objects can then be provisioned through APIs, database utilities, or fixtures. This becomes particularly important for parallel execution, environment independence, and large-scale test automation.

What is the role of fixtures in an enterprise framework?
    Fixtures are the dependency and lifecycle management layer of the Playwright framework.
        Test
        ↓
        Fixture Layer
        ├── Authentication
        ├── Browser / Context
        ├── Page Objects
        ├── API Client
        ├── DB Connection
        ├── Test Data
        └── Configuration
        ↓
        Application

    The fixture can handle:
        Setup — create DB connection, authenticate, create test data
        Dependency injection — provide db, apiClient, loginPage, etc.
        Isolation — give each test appropriate resources
        Cleanup — close connections, remove data, etc.
        Reusability — common infrastructure is defined once
        Parallel execution — manage resources safely across tests.

Page Objects manage application interaction.
Test Data Factories manage data generation.
Fixtures manage dependencies and their lifecycle.
Tests validate business behavior.