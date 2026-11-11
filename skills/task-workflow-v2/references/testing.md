# Test assignment

- Own only named tests, isolated test records and test-only setup; reuse existing coverage and report gaps to main.
- Never edit product code (including to make testing convenient), weaken assertions, touch the app driver's database or browser, or rebuild served assets. Report a product defect with decisive evidence to main and continue independent cases.
- Unit runners may compile their own inputs; that is not an app rebuild.
- Automated end-to-end checks use proven isolated disposable state and the project-supported runner. Do not rebuild or disturb the served app. Stop only processes you own and clean only data you created. Report if isolation cannot be established.
- Rerun only when code, tests, test records or config changed, or a narrower diagnostic is needed.
- Test only the changed path, never the whole app; start minimal and add only what the change needs.
- Start with a happy-path case and a wrong-path case where applicable, and include every additional case main names to cover task-required or warranted behavior; this is not a numerical cap. A case failing for product code goes to main, not into more tests.
