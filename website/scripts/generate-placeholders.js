const { main: generateVideos } = require("./generate-video-placeholders");
const { main: generateImages } = require("./generate-image-placeholders");

async function main() {
  console.log("🎬🖼️  Generating all media placeholders...\n");

  try {
    await generateVideos();

    console.log("");

    await generateImages();

    console.log("\n✅ All media placeholders generated successfully!");
  } catch (error) {
    console.error("❌ Error generating media placeholders:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
