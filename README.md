# Codex China Travel Suite

A community Codex plugin for mainland-China travel with live AMap geography and routes, DiDi ride tools, and Fliggy and Meituan travel-product discovery.

## Included skills

- `amap-trip-planner`: POI verification, routing, weather, itinerary checks, and AMap navigation links.
- `didi-ride`: nearby-place search, route and fare estimates, and confirmed ride operations.
- `fliggy-flyai`: flights, hotels, attractions, and travel-product search.
- `meituan-travel`: hotel, flight, train, attraction, and holiday-product search.

The repository intentionally does not bundle 12306 code. Use an independently licensed 12306 integration when authoritative train availability is required.

## Install

Requirements: Node.js 20 or newer and Codex with plugin support.

```bash
git clone https://github.com/DrivingGodJ/codex-china-travel-suite.git
cd codex-china-travel-suite
npm ci --prefix plugins/codex-china-travel-suite
codex plugin marketplace add .
codex plugin add codex-china-travel-suite@drivinggodj-travel
```

Configure only the providers you use:

```bash
export AMAP_MCP_KEY="your-amap-mcp-key"
export DIDI_MCP_KEY="your-didi-mcp-key"
export MEITUAN_HT_TOKEN="your-meituan-token"
export FLYAI_API_KEY="your-flyai-key"
```

Do not paste credentials into chat or commit them. AMap and DiDi can alternatively read macOS Keychain services `codex-china-travel-suite-amap-key` and `codex-china-travel-suite-didi-key`.

## Safety model

- AMap is the geographic and routing authority; OTA results are inventory candidates.
- Prices, schedules, availability, and opening rules are time-sensitive and must be rechecked.
- Search and estimation are read-only.
- DiDi order creation and cancellation require fresh explicit confirmation.
- The plugin does not complete purchases, hotel bookings, ticketing, or payments.

## Development

```bash
npm ci --prefix plugins/codex-china-travel-suite
npm run check --prefix plugins/codex-china-travel-suite
npm test --prefix plugins/codex-china-travel-suite
```

Validate the plugin and each skill with the bundled Codex validators before release.

## License

MIT. The AMap-derived skill retains its upstream MIT notice; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
