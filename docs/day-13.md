Agentic AI + Playwright
=======================
Agentic QE adds a loop:
             ┌──────────────────────┐
             │      QE Goal         │
             │ "Automate EFT test"  │
             └──────────┬───────────┘
                        ↓
                    AI plans
                        ↓
                 AI inspects repo
                        ↓
                 AI finds existing
                 Pages / Fixtures
                        ↓
                  AI modifies code
                        ↓
                 AI runs Playwright
                        ↓
              ┌─────────┴─────────┐
              │                   │
            PASS                FAIL
              │                   │
              ↓                   ↓
          Report             Analyze failure
                                  ↓
                            Propose/fix
                                  ↓
                              Run again
                                  │
                                  └───→
                         Human approval / control


An agent generally has:
    - Goal
        Add automated coverage for a scenario
    - Context
        pages/
        fixtures/
        api/
        database/
        tests/
        .github/copilot-instructions.md
        docs/architecture.md
    - Tools
        Read files
        Search repository
        Edit files
        Run commands
        Run tests
        Inspect test results
        Inspect Git diff
    - Reasoning/pannning
        Do I already have a Page Object?
        Do I have an API client?
        Do I need a new fixture?
        Where should the test go?
        What existing test can I reuse?
    - Execution
        Create/update files
        Run npm test
        Inspect failure
        Modify code
        Run again
    - Feedback loop
        Plan
        ↓
        Act
        ↓
        Observe
        ↓
        Reason
        ↓
        Act again

AI Agent
   ↓
Repository instructions
   ↓
Existing architecture
   ↓
Existing code
   ↓
Business requirement
   ↓
Controlled implementation


Agentic Workflow
    Requirement
        ↓
    AI analyzes requirement
        ↓
    AI identifies existing framework components
        ↓
    AI proposes implementation
        ↓
    Human approves
        ↓
    AI modifies repository
        ↓
    AI executes Playwright
        ↓
    AI analyzes result
        ↓
    AI proposes correction
        ↓
    Human reviews (AI --> Analyze --> Propose --> Human approval --> Execute --> CI --> Quality gate)
        ↓
    Final test

The Agent Loop
            ┌───────────┐
            │    GOAL   │
            └─────┬─────┘
                  ↓
            ┌───────────┐
            │    PLAN   │
            └─────┬─────┘
                  ↓
            ┌───────────┐
            │   ACT     │
            └─────┬─────┘
                  ↓
            ┌───────────┐
            │  OBSERVE  │
            └─────┬─────┘
                  ↓
            ┌───────────┐
            │  REASON   │
            └─────┬─────┘
                  ↓
            ┌───────────┐
            │   ACT     │
            └─────┬─────┘
                  │
                  └──────────→ repeat until goal/stop condition

What tools does a QE Agent need?

| Tool          | Purpose                   |
| ------------- | ------------------------- |
| File search   | Find existing tests/pages |
| File read     | Understand implementation |
| File edit     | Create/modify automation  |
| Terminal      | Run npm/Playwright        |
| Test runner   | Execute tests             |
| Trace/results | Diagnose failures         |
| Git diff      | Review changes            |
| Browser       | Inspect application       |
| API           | Create/clean test data    |
=============================================

Agentic QE Architecture

                  BUSINESS REQUIREMENT
                           │
                           ↓
                    ┌─────────────┐
                    │   AI AGENT  │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ↓            ↓            ↓
          Repository     QE Rules     Existing
           Context      / Prompts      Tests
              │            │            │
              └────────────┼────────────┘
                           ↓
                     Test Planning
                           ↓
                    Test Generation
                           ↓
                    Playwright
                    UI / API / DB
                           ↓
                       CI / Jenkins
                           ↓
                     Test Results
                           ↓
                    AI Failure Analysis
                           ↓
                     QE Validation
