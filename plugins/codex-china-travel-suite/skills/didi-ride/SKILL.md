---
name: didi-ride
description: Use DiDi MCP tools for place search, routes, fare estimates, ride status, ordering, and cancellation in China. Trigger for explicit DiDi, taxi, ride-hailing, fare-estimate, or active ride-order requests; do not intercept generic trip planning or another named navigation service.
---

# DiDi ride

Use the bundled `didi` MCP server. Never request or print `DIDI_MCP_KEY`.

## Read-only flow

1. Resolve origin and destination with the provider's place-search tool; never invent coordinates or silently reuse a previous location.
2. If a place is ambiguous, ask the user to choose the exact candidate.
3. Request a fresh route or fare estimate and preserve its trace identifier and available vehicle categories.
4. Report the estimate as time-sensitive and keep returned values exact.

## Order flow

Before creating an order, show the exact origin, destination, vehicle category, and current estimate, then obtain fresh explicit confirmation. A general request to “call a car” is intent, not final confirmation. Use only the latest estimate and trace identifier; if they expire or material details change, estimate again and reconfirm.

Before cancellation, obtain fresh explicit confirmation immediately before the cancellation tool call. Never expose phone numbers, precise saved addresses, order identifiers, driver details, or credentials beyond what the requesting user needs.

Search, route, and estimate calls do not prove that ordering or cancellation has been tested or completed. Report only the operation actually returned by the provider.
