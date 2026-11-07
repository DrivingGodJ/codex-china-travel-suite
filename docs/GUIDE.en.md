[简体中文](GUIDE.zh-CN.md) | **English**

# Usage, Configuration and Development

[Back to the project](../README.en.md)

## Quick start

Requires Node.js **20+** and a version of Codex with plugin support. Run:

```bash
git clone https://github.com/DrivingGodJ/codex-china-travel-suite.git
cd codex-china-travel-suite
npm ci --prefix plugins/codex-china-travel-suite
codex plugin marketplace add .
codex plugin add codex-china-travel-suite@drivinggodj-travel
```

Configure only the services you use. These Bash examples leave values empty; keep real credentials in your own environment:

```bash
export AMAP_MCP_KEY=""
export DIDI_MCP_KEY=""
export MEITUAN_HT_TOKEN=""
export FLYAI_API_KEY=""
```

On Windows, set user environment variables and fully restart Codex. On macOS, AMap and DiDi credentials may also use the Keychain services `codex-china-travel-suite-amap-key` and `codex-china-travel-suite-didi-key`. Never put real credentials in conversations or the repository.

## Usage

For example, ask to check tomorrow's Nanjing itinerary and transfer times, then explicitly request any booking or calendar changes. AMap is the primary place and route reference. Recheck prices, inventory, schedules, opening hours and reservation rules before acting.

Rail workflows require a separately configured 12306 integration or the official website/app; no 12306 client is bundled. An installed `12306-train-assistant` can be reused. iCloud Calendar also reuses an independent CalDAV MCP connection. A new connection can use `@lukegskw/caldav-mcp@0.1.9`, Node.js **22+**, `CALDAV_USERNAME` and an Apple app-specific password in `CALDAV_PASSWORD`; see [calendar setup (Chinese)](../plugins/codex-china-travel-suite/skills/icloud-calendar/references/setup.md). Verify installation by listing calendars and reading events.

- A query does not authorize orders, payment, cancellation or calendar writes. Show current details and obtain explicit confirmation for each DiDi order creation or cancellation.
- A held seat or unpaid order is not a ticket. Mark travel as purchased only after official payment/ticket confirmation. If browser policy blocks payment, hand it to the user in the official app and then verify the order.
- Check calendar duplicates first and classify against the user's existing lists. Preserve times, locations, notes and multiple reminders. For cross-calendar moves, verify the destination before removing the source, then check for duplicates again.

## Development and checks

```bash
npm ci --prefix plugins/codex-china-travel-suite
npm run check --prefix plugins/codex-china-travel-suite
npm test --prefix plugins/codex-china-travel-suite
```

Before release, also validate the plugin manifest and each skill with Codex's validators. Service authentication and real order status require separate checks in your environment.

## Documentation and support

- [Changelog](../CHANGELOG.md) · [Contributing](../CONTRIBUTING.md) · [Security](../SECURITY.md)
- [Report an issue](https://github.com/DrivingGodJ/codex-china-travel-suite/issues)

## License and credits

[MIT License](../LICENSE). The AMap skill builds on an MIT-licensed AMap Open Platform project and preserves upstream copyrights; see [third-party notices](../THIRD_PARTY_NOTICES.md). No private accounts are bundled.
