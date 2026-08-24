# Contributing

Keep changes provider-scoped, preserve user intent, and avoid personal defaults or embedded credentials.

Before opening a pull request:

1. Run `npm ci --prefix plugins/codex-china-travel-suite`, then the package's `check` and `test` scripts.
2. Validate the plugin and every changed skill with the bundled Codex validators.
3. Confirm no generated dependencies, private config, logs, or secret material are staged.
4. Preserve third-party copyright and license notices.

Use read-only service calls for integration tests unless a test account and explicit authorization cover a higher-impact action.
