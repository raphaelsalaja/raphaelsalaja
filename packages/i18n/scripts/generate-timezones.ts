// scripts/generate-timezone-meta.js
const { getTimeZones } = require("@vvo/tzdb");
const { writeFileSync } = require("node:fs");
const { join } = require("node:path");
const { mkdirSync, existsSync } = require("node:fs");

const zones = getTimeZones();

// Build a lightweight meta object
const timeZoneMeta = zones.map(
  (tz: {
    name: any;
    alternativeName: any;
    abbreviation: any;
    countryName: any;
    continentName: any;
    rawOffsetInMinutes: any;
  }) => ({
    value: tz.name, // canonical IANA name
    label: `${tz.alternativeName} (${tz.abbreviation})`,
    abbreviation: tz.abbreviation,
    country: tz.countryName,
    continent: tz.continentName,
    offset: tz.rawOffsetInMinutes, // in minutes
  })
);

// Generate stringified TypeScript export
const content = `// AUTO-GENERATED FILE — DO NOT EDIT
// Generated with scripts/generate-timezone-meta.js

export const timeZoneMeta = ${JSON.stringify(timeZoneMeta, null, 2)} as const;

export type TimeZoneMeta = typeof timeZoneMeta[number];

export type TimeZone = TimeZoneMeta["value"];
export type TimeZoneLabel = TimeZoneMeta["label"];
export type TimeZoneAbbreviation = TimeZoneMeta["abbreviation"];
export type TimeZoneCountry = TimeZoneMeta["country"];
export type TimeZoneContinent = TimeZoneMeta["continent"];
export type TimeZoneOffset = TimeZoneMeta["offset"];

`;

const outPath = join(__dirname, "../src/data/timeZones.ts");

// Ensure the directory exists
const dirPath = join(__dirname, "../src/data");

if (!existsSync(dirPath)) {
  mkdirSync(dirPath, { recursive: true });
}

writeFileSync(outPath, `${content.trim()}\n`);

console.log("✅ Time zone meta data written to src/data/timeZones.ts");
