# Security policy

Never commit API keys, tokens, cookies, order details, phone numbers, or precise saved addresses. Configure credentials through environment variables. On macOS, the AMap and DiDi bridges can also read from Keychain.

If a secret is committed or printed, revoke or rotate it immediately and remove it from Git history.

Searches, route checks, and fare estimates are read-only. DiDi order creation and cancellation require fresh, explicit user confirmation immediately before the tool call. This repository does not authorize purchases, payments, ticket issuance, hotel bookings, or Calendar writes.

Use GitHub's private vulnerability reporting when enabled. Do not open a public issue containing credentials or personal travel data.
