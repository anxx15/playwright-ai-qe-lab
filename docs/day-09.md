Parallel Execution, Reporting & Scaling
=======================================
npx playwright test --workers=5

How would you make Playwright tests parallelizable?
    Don't just say: I'll increase workers.

    I would first ensure test-data and session isolation, remove shared mutable state, and then tune worker concurrency based on infrastructure capacity.

Retries:
    retries: 2
        Test fails
            ↓
        Retry
            ↓
        Fails again
            ↓
        Retry
            ↓
        Final result

Common causes of a flaky test:
    bad synchronization
    waitForTimeout
    unstable test data
    shared state
    environment instability
    race conditions
    network dependency
    application timing
    poor locator
    parallel execution conflicts

Run/inclue: 
    npx playwright test --grep @smoke
Exclude:
    npx playwright test --grep-invert @slow

Sharding:
    Distribute the test suite across multiple execution environments. instead of
        Jenkins
            └── 10,000 tests

        Jenkins
            ├── Shard 1 → 2,500 →  Workers
            ├── Shard 2 → 2,500 →  Workers
            ├── Shard 3 → 2,500 →  Workers
            └── Shard 4 → 2,500 →  Workers

Trace Viewer: a trace can show:
    Timeline
    Actions
    DOM snapshot
    Network
    Console
    Screenshots
    Source

    use: {
    trace: 'on-first-retry'
    }

    npx playwright show-trace trace.zip

Screenshots
    use: {
    screenshot: 'only-on-failure'
    }

    or
    await page.screenshot({
        path: 'screenshots/payment.png'
    });

    or for video
    use: {
        video: 'retain-on-failure'
    }

