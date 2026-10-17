# iCloud connection setup

Reuse an existing working calendar connection. Do not add a second server merely because this skill is newly installed.

## Credentials and runtime

The verified connector is [`@lukegskw/caldav-mcp@0.1.9`](https://github.com/lukegskw/caldav-mcp), an independent MIT project requiring Node.js 22 or newer. It exposes `list_calendars`, `list_events`, `get_event`, `create_event`, `update_event`, and `delete_event`. The travel plugin itself retains its existing Node.js 20 requirement; the separate calendar runtime needs Node.js 22.

Use the Apple Account email as `CALDAV_USERNAME` and an [Apple app-specific password](https://support.apple.com/en-us/102654) as `CALDAV_PASSWORD`. Have the user enter these in private environment settings, not in chat or tracked files. Use an app-specific password rather than the normal Apple Account password.

For a new connection, install the pinned connector in a private runtime directory:

```bash
npm install --prefix /path/to/private-calendar-runtime --save-exact @lukegskw/caldav-mcp@0.1.9
```

Configure one `icloud-calendar` stdio MCP server. For example, in the user's private Codex configuration:

```toml
[mcp_servers.icloud-calendar]
command = "node"
args = ["/absolute/path/to/private-calendar-runtime/node_modules/@lukegskw/caldav-mcp/dist/main.js"]
env_vars = ["PATH", "CALDAV_USERNAME", "CALDAV_PASSWORD"]
```

Resolve the actual installed Node executable and connector path on that machine. On Windows, absolute paths can use forward slashes; using Node with the installed JavaScript entry point avoids assuming that a shell can launch `npx.cmd` directly.

On Windows, new user environment variables do not update an already running app's environment. Fully exit and reopen Codex after setting them. Check only whether the variables exist; never print their values or the complete private configuration.

## Verification

1. Confirm the six tools are available, then call `list_calendars`.
2. Read a small user-relevant date range in the intended timezone. An empty successful result still confirms a working read path.
3. Use the user's requested event for an authorized write and read it back; do not create unsolicited test events in the real account.

Do not claim the connection works merely because a package installed. Keep credential values, CalDAV URLs, raw events, and authentication diagnostics out of Git and shared logs. After package or app updates, rediscover the current tool schemas instead of assuming old prefixes or IDs still work.
