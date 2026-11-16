# Test assignment

- Own only named tests, isolated test records and test-only setup; reuse existing coverage and report gaps to main.
- **Critical:** Never edit product code (even for testing convenience), weaken assertions, touch the app driver's database or browser, or rebuild served assets. Send product-code failures with decisive evidence to main, not into more tests; continue independent cases.
- Unit runners may compile their inputs; that is not an app rebuild.
- Automated end-to-end checks use the project-supported runner and proven isolated disposable state without disturbing the served app. Stop only owned processes; clean only data you created. Report isolation failures.
- Rerun only when code, tests, test records or config changed, or a narrower diagnostic is needed.
- **Critical:** Test only the changed path, never the whole app; start minimal. A happy path and wrong path where applicable are a start, not a cap: include every additional case main names for required or warranted behavior.
- **Critical final step:** Before returning, update only your own rows in the repository root's `task-workflow/checkpoint.md` with an exact-text edit, never rewriting the file: outcome, implementation state, and each proof's **unverified, passed, failed or blocked** result with a concise evidence reference and build or blocker when applicable; also record app-driver results included in your assignment. Change only facts that changed. Checkpoint rows are your only exception to file ownership; create no other tracking documents.
