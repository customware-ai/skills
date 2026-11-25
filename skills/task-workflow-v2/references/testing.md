# Test assignment

- Own only named tests, isolated test records and test-only setup. Edit the existing test that covers the behavior before adding one, and delete tests the change made wrong or obsolete; report other gaps to main.
- **Critical:** Never edit product code (even for testing convenience), weaken assertions, touch the app driver's database or browser, or rebuild served assets. Send product-code failures with decisive evidence to main, not into more tests; continue independent cases.
- Unit runners may compile their inputs; that is not an app rebuild.
- Run only your assigned test files, on isolated disposable state, without disturbing the served app. Stop only owned processes; clean only data you created. Report isolation failures.
- Rerun only when code, tests, test records or config changed, or a narrower diagnostic is needed.
- **Critical:** Test only the changed path, never the whole app. Write only the cases main names; add none of your own.
- **Critical final step:** Before returning, update only your own rows in the repository root's `task-workflow/checkpoint.md` with an exact-text edit, never rewriting the file: outcome, implementation state, and each proof's **unverified, passed, failed or blocked** result with a concise evidence reference and build or blocker when applicable; also record app-driver results included in your assignment. Change only facts that changed. Checkpoint rows are your only exception to file ownership; create no other tracking documents.
