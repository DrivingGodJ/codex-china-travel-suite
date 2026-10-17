# Provider orchestration

Use AMap first to identify the exact geographic candidates. OTA and ride tools are additional layers, not replacements for POI identity or routing.

## Hotels and attractions

1. Resolve the exact property, entrance, station, or attraction with AMap.
2. Search one OTA for candidates and use a second current source for important final conditions.
3. Preserve exact product name, dates, traveler scope, price text, inclusions, cancellation terms, and booking URL.
4. Mark missing fields as not returned. A search-card “from” price is not a confirmed payable price.

## Flights

Keep airports, local dates, flight number, cabin, baggage, transfers, change rules, and price scope distinct. Do not infer a round-trip or group total from a one-way or per-person value.

## Rides

Use AMap or DiDi place search to resolve both endpoints. Fare estimates are temporary. Follow the `didi-ride` skill for ordering or cancellation confirmation.

## Failure handling

If one provider is unavailable, continue with the other relevant source and state which cross-check is missing. Do not repeatedly retry the same failing provider.

## Rail and calendar coordination

Use the bundled `rail-trip-planner` skill to verify exact rail stations, appointment-to-station buffers, the last onward train, and official booking/payment status. Rail inventory comes from 12306, not a map estimate or an OTA search heading.

Use the bundled `icloud-calendar` skill for authorized itinerary writes. Check duplicates across relevant calendars before and after changes, classify events by purpose, and preserve existing fields when editing or moving. A planned train, pending-payment order, paid ticket, and unbooked ground transfer must remain distinguishable.
