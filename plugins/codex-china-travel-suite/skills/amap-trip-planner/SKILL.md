---
name: amap-trip-planner
description: Plan mainland-China trips with live AMap POI, route, weather, and navigation-link checks, optionally comparing Fliggy and Meituan travel inventory. Use for China attractions, hotels, restaurants, road trips, public transit, travel times, or itinerary changes; do not use as the authority for rail ticket availability.
---

# AMap trip planning

Use the bundled `amap` MCP server as the geographic and routing authority. Read `references/provider-orchestration.md` when hotels, flights, tickets, rides, or cross-provider comparison are involved. Use the bundled `rail-trip-planner` skill for trains around an appointment and `icloud-calendar` when the user authorizes saving or editing the itinerary.

## Workflow

1. Gather only constraints that materially change the result: dates, travelers, origin, pace, budget, interests, transport mode, and hard arrival times.
2. Resolve every important place to an exact AMap POI. If search results are ambiguous, show the candidates and ask the user to choose.
3. Cluster nearby stops, then route every consecutive pair with the intended mode. Compare public transit before recommending a car when it is realistic.
4. Verify opening hours, reservation rules, temporary closures, and ticket eligibility from current official sources. Treat map metadata as location data, not final admission policy.
5. Use Fliggy or Meituan only after the geographic shortlist is sensible. Re-run affected routes after the user chooses a different hotel, entrance, station, or attraction.
6. Return a relaxed itinerary with transit buffers, exact place names, route durations, and one-tap AMap navigation links when the tool provides them.
7. Before an authorized calendar write, check existing events across the relevant lists and dates, reuse matching entries, and classify each activity or transport leg in the appropriate existing calendar. Read back the result and check for duplicates afterward.

## Stop times and travel gaps

- Calendar meal and visit times cover the actual stay at that place. For short local walks or transfers, typically around 15–20 minutes, leave the calendar gap empty instead of creating a transport event, zero-duration placeholder, or all-day item. Put the route and estimated duration in the adjacent stop's notes.
- Empty calendar space still needs enough travel time: verify each gap against the routed duration plus an appropriate access, waiting, or crossing buffer. Shorten or move flexible stops when necessary; preserve confirmed admission windows and train times.
- Keep a separate transport event for a substantial journey or a connection that controls arrival. Distinguish the map estimate from time for walking to the station, transfers, car pickup, traffic, and venue entry. Do not label a large unused interval as travel time merely to fill the calendar.
- When recalibrating an itinerary, recheck the affected routes with the intended mode and exact entrances. Read back stop times, meaningful transport blocks, empty short-transfer gaps, and hard arrival deadlines; confirm that the gaps are feasible and obsolete transport events are gone.

## Reliability boundaries

- Weather, traffic, opening rules, inventory, and prices are time-sensitive; state the query time and recheck before execution.
- Keep returned coordinates, distance, duration, tolls, and navigation URLs exact. Do not invent missing fields.
- A route result is not evidence that a venue is open or bookable.
- A train listing from an OTA is supplementary. Use an independently licensed 12306 integration or the official 12306 channel for authoritative train availability.
- Research is read-only. Do not book, pay, cancel, order a ride, or write to a Calendar without explicit authorization for that separate action.
