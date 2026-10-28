import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, renameSync, statSync } from "node:fs";
import { join } from "node:path";

// Usage: pnpm media [--force]
// Requires ffmpeg and ffprobe on PATH.

const ROOT = "public/media/work";
const MAX_WIDTH = 960;
const force = process.argv.includes("--force");

function probe(file) {
  const { stdout } = spawnSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "stream=codec_type,width",
      "-of",
      "json",
      file,
    ],
    { encoding: "utf8" },
  );
  const streams = JSON.parse(stdout).streams ?? [];
  return {
    width: streams.find((s) => s.codec_type === "video")?.width ?? 0,
    audio: streams.some((s) => s.codec_type === "audio"),
  };
}

function ffmpeg(args) {
  const result = spawnSync("ffmpeg", ["-v", "error", "-y", ...args], {
    stdio: "inherit",
  });
  if (result.status !== 0) throw new Error(`ffmpeg failed: ${args.join(" ")}`);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

for (const file of walk(ROOT).filter((f) => f.endsWith(".mp4"))) {
  const { width, audio } = probe(file);
  const before = statSync(file).size;

  if (force || width > MAX_WIDTH || audio) {
    const tmp = file.replace(/\.mp4$/, ".tmp.mp4");
    ffmpeg([
      "-i",
      file,
      "-vf",
      `scale='min(${MAX_WIDTH},iw)':-2,fps='min(60,source_fps)'`,
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "28",
      "-pix_fmt",
      "yuv420p",
      "-an",
      "-movflags",
      "+faststart",
      tmp,
    ]);
    renameSync(tmp, file);
  }

  const poster = file.replace(/\.mp4$/, ".jpg");
  if (force || !existsSync(poster)) {
    ffmpeg([
      "-i",
      file,
      "-frames:v",
      "1",
      "-vf",
      "scale='min(640,iw)':-2",
      "-q:v",
      "5",
      poster,
    ]);
  }

  const after = statSync(file).size;
  console.log(
    `${file}  ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB`,
  );
}
