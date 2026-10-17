# Security policy

Never commit API keys, tokens, cookies, order details, phone numbers, or precise saved addresses. Configure credentials through environment variables. On macOS, the AMap and DiDi bridges can also read from Keychain.

If a secret is committed or printed, revoke or rotate it immediately and remove it from Git history.

Searches, route checks, and fare estimates are read-only. DiDi order creation and cancellation require fresh, explicit user confirmation immediately before the tool call. Installing this repository does not authorize purchases, payments, ticket issuance, hotel bookings, or Calendar writes; those actions require the user's actual task authorization and the active tool's applicable controls.

Calendar workflows must check for duplicates across relevant lists before and after changes, preserve fields outside the requested edit, and verify a destination event before removing its source during a move. Never publish calendar exports, account identifiers, login QR codes, order screenshots, cookies, or app-specific passwords as examples or test fixtures. Rail workflows must reconcile uncertain submissions before retrying and distinguish pending payment from a paid/issued ticket.

Use GitHub's private vulnerability reporting when enabled. Do not open a public issue containing credentials or personal travel data.
