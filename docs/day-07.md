Database Testing with Playwright
================================
             TEST
               │
       ┌───────┼────────┐
       │       │        │
      UI      API       DB
       │       │        │
    Browser   HTTP    Database

A UI assertion tells you:
    The user-facing behavior looks correct.

A DB assertion can tell you:
    The persisted state is correct.


Playwright doesn't have a built-in: database.query()
    Instead, Node.js can use database drivers:
        PostgreSQL → pg
        MySQL → mysql2
        SQL Server → mssql
        Oracle → oracledb

Don't solve timing issues with waitForTimeout()
    Query DB
        ↓
        Record exists?
        ├── Yes → continue
        └── No
            ↓
        wait briefly
            ↓
        query again

Polling utility
    Wait UP TO 30 seconds
    until condition becomes true

Test data cleanup
    API cleanup
        Create through API
            ↓
            Test
            ↓
            Delete through API
    DB cleanup
        Test
        ↓
        DELETE test record



              E2E UI
             /      \
            /        \
          API        Integration
          /            \
         /              \
      Unit / Component


Create a conceptual API → DB test:
    API creates transaction
            ↓
    extract transaction ID
            ↓
    query DB
            ↓
    validate transaction

                       TEST
                         │
                     FIXTURES
                         │
          ┌──────────────┼──────────────┐
          │              │              │
       UI Layer       API Layer       DB Layer
          │              │              │
     Page Objects     API Clients    Repositories
          │              │              │
     Components     APIRequest       DbClient
          │          Context             │
          ▼              ▼               ▼
      Browser           HTTP          Database

I use each layer for what it validates best. APIs provide fast setup and service-level validation, DB validation verifies persistence where required, and UI tests focus on user-facing behavior. Combining the layers selectively gives better coverage and faster execution than making every test a full UI-to-DB end-to-end test.