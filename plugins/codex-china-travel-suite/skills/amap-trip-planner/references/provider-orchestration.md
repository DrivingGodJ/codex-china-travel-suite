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
