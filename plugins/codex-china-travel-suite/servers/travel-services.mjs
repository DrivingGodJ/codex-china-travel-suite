import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { z } from "zod";

const require = createRequire(import.meta.url);
const flyaiPackage = require.resolve("@fly-ai/flyai-cli/package.json");
const flyaiBin = path.join(path.dirname(flyaiPackage), "dist", "flyai-bundle.cjs");
const meituanPackage = require.resolve("@meituan-travel/ht-ai/package.json");
const meituanBin = path.join(path.dirname(meituanPackage), "dist", "index.js");

function runNode(script, args, timeout = 180000) {
  const result = spawnSync(process.execPath, [script, ...args], {
    encoding: "utf8",
    env: process.env,
    maxBuffer: 16 * 1024 * 1024,
    timeout,
  });
  const output = `${result.stdout || ""}${result.stderr || ""}`.trim();
  if (result.error) {
    return { content: [{ type: "text", text: `Execution error: ${result.error.message}` }], isError: true };
  }
  if (result.status !== 0) {
    return { content: [{ type: "text", text: output || `Process exited with ${result.status}` }], isError: true };
  }
  return { content: [{ type: "text", text: output || "(no output)" }] };
}

function addFlag(args, flag, value) {
  if (value !== undefined && value !== null && value !== "") args.push(flag, String(value));
}

const server = new McpServer({ name: "meituan-fliggy", version: "0.1.0" });

server.registerTool(
  "meituan_travel_query",
  {
    title: "Meituan Travel search",
    description: "Search Meituan Travel for hotels, flights, trains, attraction tickets, and holiday products.",
    inputSchema: {
      query: z.string().describe("Complete natural-language query"),
      city: z.string().optional().describe("Optional city name"),
    },
  },
  async ({ query, city }) => {
    const args = ["query", "--query", query, "--origin-query", query, "--channel", "codex-community"];
    addFlag(args, "--city", city);
    return runNode(meituanBin, args);
  },
);

server.registerTool(
  "fliggy_fast_search",
  {
    title: "Fliggy broad travel search",
    description: "Search Fliggy for travel products using a natural-language query.",
    inputSchema: { query: z.string() },
  },
  async ({ query }) => runNode(flyaiBin, ["fliggy-fast-search", "--query", query]),
);

server.registerTool(
  "fliggy_search_hotels",
  {
    title: "Fliggy hotel search",
    description: "Search hotels by destination, dates, price, stars, bed type, or nearby POI.",
    inputSchema: {
      dest_name: z.string(), key_words: z.string().optional(), poi_name: z.string().optional(),
      hotel_types: z.string().optional(),
      sort: z.enum(["distance_asc", "rate_desc", "price_asc", "price_desc", "no_rank"]).optional(),
      check_in_date: z.string().optional(), check_out_date: z.string().optional(),
      hotel_stars: z.string().optional(), hotel_bed_types: z.string().optional(),
      max_price: z.number().optional(),
    },
  },
  async (input) => {
    const args = ["search-hotels"];
    const flags = {
      dest_name: "--dest-name", key_words: "--key-words", poi_name: "--poi-name",
      hotel_types: "--hotel-types", sort: "--sort", check_in_date: "--check-in-date",
      check_out_date: "--check-out-date", hotel_stars: "--hotel-stars",
      hotel_bed_types: "--hotel-bed-types", max_price: "--max-price",
    };
    for (const [key, flag] of Object.entries(flags)) addFlag(args, flag, input[key]);
    return runNode(flyaiBin, args);
  },
);

server.registerTool(
  "fliggy_search_flights",
  {
    title: "Fliggy flight search",
    description: "Search flights by cities, dates, cabin, schedule, price, and sort order.",
    inputSchema: {
      origin: z.string(), destination: z.string().optional(), dep_date: z.string().optional(),
      dep_date_start: z.string().optional(), dep_date_end: z.string().optional(),
      back_date: z.string().optional(), back_date_start: z.string().optional(),
      back_date_end: z.string().optional(), journey_type: z.number().int().min(1).max(2).optional(),
      seat_class_name: z.string().optional(), transport_no: z.string().optional(),
      transfer_city: z.string().optional(), dep_hour_start: z.number().int().min(0).max(23).optional(),
      dep_hour_end: z.number().int().min(0).max(23).optional(),
      arr_hour_start: z.number().int().min(0).max(23).optional(),
      arr_hour_end: z.number().int().min(0).max(23).optional(),
      total_duration_hour: z.number().optional(), max_price: z.number().optional(),
      sort_type: z.number().int().min(1).max(8).optional(),
    },
  },
  async (input) => {
    const args = ["search-flight"];
    const flags = {
      origin: "--origin", destination: "--destination", dep_date: "--dep-date",
      dep_date_start: "--dep-date-start", dep_date_end: "--dep-date-end",
      back_date: "--back-date", back_date_start: "--back-date-start",
      back_date_end: "--back-date-end", journey_type: "--journey-type",
      seat_class_name: "--seat-class-name", transport_no: "--transport-no",
      transfer_city: "--transfer-city", dep_hour_start: "--dep-hour-start",
      dep_hour_end: "--dep-hour-end", arr_hour_start: "--arr-hour-start",
      arr_hour_end: "--arr-hour-end", total_duration_hour: "--total-duration-hour",
      max_price: "--max-price", sort_type: "--sort-type",
    };
    for (const [key, flag] of Object.entries(flags)) addFlag(args, flag, input[key]);
    return runNode(flyaiBin, args);
  },
);

server.registerTool(
  "fliggy_search_poi",
  {
    title: "Fliggy attraction search",
    description: "Search attractions and ticket products by city, keyword, level, or category.",
    inputSchema: {
      city_name: z.string(), poi_level: z.number().int().min(1).max(5).optional(),
      keyword: z.string().optional(), category: z.string().optional(),
    },
  },
  async (input) => {
    const args = ["search-poi"];
    addFlag(args, "--city-name", input.city_name);
    addFlag(args, "--poi-level", input.poi_level);
    addFlag(args, "--keyword", input.keyword);
    addFlag(args, "--category", input.category);
    return runNode(flyaiBin, args);
  },
);

await server.connect(new StdioServerTransport());
