---
name: icloud-calendar
description: Read and organize iCloud Calendar events, including itinerary scheduling, duplicate checks, existing-calendar classification, reminders, and moving an event between calendars. Use for direct requests to add, edit, move, or review iCloud events; a travel discussion alone does not authorize calendar changes.
---

# iCloud Calendar

Use the configured iCloud CalDAV MCP tools. Discover their current names and schemas; do not assume a server prefix. If the connection is missing, read [connection setup](references/setup.md). This skill uses an independently configured MCP server; the travel plugin does not install a second calendar server.

## Read before writing

1. Call `list_calendars` to obtain current calendar IDs and understand the user's existing lists. Check all relevant lists, rather than searching only the eventual destination.
2. Read the affected dates before any create, update, or move. For rescheduling, search both the old and new dates. Follow every pagination cursor before deciding an event is absent. Use matching timezone offsets; all-day end dates are exclusive.
3. Identify an existing event by its `resource_id` or UID first, then compare normalized title, occurrence time, location, and relevant booking details. Matching words or overlapping times alone do not make two events duplicates: travel, check-in, and the activity can be distinct.
4. Reuse or update the matching event instead of creating another one. After an interrupted or uncertain write, read back first. Do not infer failure from a timeout and repeat the create. If several matches cannot be distinguished, resolve that ambiguity before mutating them; a duplicate check is not permission to delete unrelated records.

## Classify using the existing lists

The user's explicit destination and established convention take precedence. Otherwise match the event's purpose to the names and descriptions returned by `list_calendars`:

| Event purpose | Existing-list examples |
| --- | --- |
| Exhibitions, visits, organized activities | 活动 |
| Train journeys, station transfers, travel logistics | 日程 or an existing travel calendar |
| Classes, study, exams | 学习 |
| Performances, films, games | 影/剧/游/演出 |
| Club work, family plans, birthdays | The corresponding existing club, family, or birthday list |

Do not default every itinerary item to one calendar, create new categories without a request, or copy another account's calendar IDs. Ask only if the user's existing lists leave a material ambiguity. Keep account-specific preferences local; this table illustrates classification, not a prescribed set of calendars.

## Update and verify

- Prefer `get_event` with the returned `resource_id` for one known event. Read current details and use `expected_etag` when available.
- Patch only requested fields. Preserve the time, timezone, location, notes, recurrence, and reminder set when they are outside the requested change. A null field clears it; an empty alarm array removes reminders.
- For itinerary timing, follow [stop times and travel gaps](../amap-trip-planner/SKILL.md#stop-times-and-travel-gaps): record actual meal and visit durations, leave short transfers as empty gaps with route estimates in adjacent notes, and retain substantial transport blocks. An empty gap must still fit the verified journey and necessary buffer.
- Record transport truthfully: suggested, ordered/pending payment, and paid/issued are different states. Do not turn a planned connection, taxi estimate, or registration screenshot into a new paid reservation.
- Read back the stored event, then check the affected dates and lists for duplicate copies. Confirm the actual calendar, time, and preserved reminders, not just that a tool was called.

## Move between calendars

Prefer a supported native move that preserves the complete event. The current six-tool CalDAV connector has no move operation; `update_event.calendar_id` identifies the source and is not a destination field.

For a verified simple, non-recurring event, use this fallback:

1. Read the source and its ETag; retain a private copy until the move is verified. Check the destination for an already moved copy before creating anything.
2. Reuse an equivalent destination copy from a prior attempt; otherwise create it with the source summary, start, end, timezone, location, description, and all alarms. Reconcile differing copies before continuing. Do not copy the source `resource_id` into the destination.
3. Read back the destination and compare the preserved fields and alarms. Only after they match, delete the source using its original `resource_id` and `expected_etag`. A concurrent-change conflict requires a fresh read, not an unconditional delete.
4. Recheck both lists: exactly one destination copy and no source copy of that event. If source removal fails, keep the verified destination, report the incomplete move, and reconcile the existing copies before retrying.

Do not reconstruct an invitation, attached event, recurring series, or occurrence with this simple fallback. If the normal result does not establish whether additional event data must be preserved, inspect the source iCalendar privately or use a supported native move. Preserve the source if its complete content cannot be transferred safely. Never publish raw calendar exports, opaque IDs, or account data.
