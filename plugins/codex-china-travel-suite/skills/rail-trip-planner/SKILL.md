---
name: rail-trip-planner
description: Plan mainland-China train journeys around appointments, verify exact stations and connections, and assist with explicitly requested 12306 booking and payment handoff. Use for rail return trips, same-day arrival requirements, or trains after an event; use AMap for ground transport and official 12306 data for rail availability.
---

# China rail trip planning

Use a configured 12306 integration or the official 12306 website/App for live train data and orders. If the separately installed `12306-train-assistant` skill is available, follow its instructions for its client. This repository does not bundle that third-party code or assume its installation path, license, credentials, or booking capability.

## Find a feasible journey

1. Read the user's relevant existing calendar entries and supplied reservations when requested. Preserve absolute dates, exact stations, appointment duration, traveler scope, hard arrival deadlines, and the latest accepted plan. Ask only for missing information that changes feasibility.
2. Query official 12306 data for the actual travel date. Inspect each result row's actual departure and arrival stations/codes: a search for one station can return other stations in the same city. Filter exact stations before ranking or booking, and show the station names explicitly.
3. Route every ground leg with `amap-trip-planner`. Budget time to leave a large venue, reach the pickup point, wait for a car, handle traffic, exit a train, transfer, pass security, and check in. A current off-peak driving estimate is not a future traffic guarantee. Do not schedule early departure from the user's event just to make a train work.
4. Check the last onward connection for the same date and exact station. Arrival after its departure is infeasible; a few minutes between trains is not a usable transfer. If the deadline cannot be met, show the concrete conflict and a feasible alternative before placing an order.
5. Compare the complete accepted trip, including a taxi or overnight stay where applicable. A fare is not a whole-trip cost if ground transport is extra. Do not invent taxi fares, book a hotel when the user can stay at home, or commit an onward leg the user wants to decide later.

## Booking and login

- Research does not authorize purchase. Use the user's actual booking instruction, passenger, seat/fare type, route, and spending limit. Carry forward authorization that still applies; a routine next step does not require restarting confirmation. Reconfirm material changes and follow any action-specific requirements of the active tools.
- Recheck inventory, fare, date, actual stations, passenger identity, and adult/student eligibility immediately before submission. Do not select the first saved passenger blindly or treat an adult fare as permission to use a student ticket.
- Check existing pending and future orders to avoid duplicates. Validate the exact route even if the integration selects a row by train number only. Never retry submission after a timeout until the pending-order or queue result has been reconciled.
- Login success is separate from installed software. Check the current session; if protected operations fail, refresh authentication rather than repeatedly calling the same failed endpoint.
- Display a fresh login QR immediately and use bounded status polling. Do not continue showing an expired QR or leak cookies, login tokens, IDs, or raw account responses. An available official browser login is a fallback; the user handles verification the tools cannot complete.
- For a separately installed command-line client, resolve its local interpreter and cookie directory. Keep account sessions separate from anonymous research so research cannot overwrite authenticated cookies. Use its documented argument order and inspect command semantics: a `dry-run` may still initialize a server-side order even if it stops before final queue confirmation.

## Payment and the itinerary

Distinguish these states in messages and calendar notes:

| Evidence | Reported state |
| --- | --- |
| Train found, no order | Suggested / not purchased |
| Order generated, seat locked, unpaid | Ordered / pending payment, with the real payment deadline |
| Official paid/issued confirmation | Purchased / issued |
| Explicit expiry or cancellation result | Expired / cancelled |
| Order missing without an authoritative result | Status unknown; check paid and pending orders |

Keep the actual amount, seat, and order number when the official result provides them. Do not claim that a seat lock or a payment-page click is a purchased ticket. A separate feeder train or taxi remains unbooked unless it was actually ordered.

If payment or authentication is blocked by the active browser's security policy, stop that blocked flow. Do not recreate it through another surface or extract the blocked payment URL. Explain the concrete limitation and direct the user to the official 12306 App's pending orders to complete payment. Read the official order status afterward before marking it paid; user confirmation alone is not an issuance check.

When calendar updates are authorized, use the bundled `icloud-calendar` skill for duplicate checks, category selection, preservation, and readback. Keep travel logistics separate from the activity itself. After a changed plan, update the matching events instead of appending a second itinerary; preserve unrelated bookings and leave undecided days open.
