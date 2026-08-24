---
name: fliggy-flyai
description: Search Fliggy FlyAI for flights, hotels, attractions, tickets, events, and travel products. Use when the user explicitly requests Fliggy or wants Fliggy inventory in a comparison; do not use for payment or unrelated Alibaba services.
---

# Fliggy FlyAI

Use the bundled `meituan-fliggy` MCP server:

- `fliggy_fast_search` for broad natural-language discovery.
- `fliggy_search_flights` after route and dates are known.
- `fliggy_search_hotels` after destination and stay dates are known.
- `fliggy_search_poi` for attractions and ticket candidates.

Preserve returned prices, dates, constraints, images, and booking URLs exactly. Mark absent fields as not returned. Search-card prices and availability are time-sensitive candidates, not confirmed payable products.

Use AMap to verify the exact hotel or attraction location and route fit. For an executable decision, cross-check important conditions with a second live source or the provider's official channel.

This integration searches and links to products; it does not complete payment or booking. `FLYAI_API_KEY` is optional for some service tiers and must never be requested or printed in chat.
