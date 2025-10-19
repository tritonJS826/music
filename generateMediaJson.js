// generate_media_list.js
import fs from "fs";
import path from "path";

const rootDir = "./public/media"; // keep using same folder name if you want
const outFile = "./public/media.json";

function getFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(entry => {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getFiles(res);
    }

    const ext = path.extname(entry.name).toLowerCase();
    const type =
      /\.(mp3|flac|wav|ogg)$/i.test(ext)
        ? "audio"
        : /\.(mp4|webm|mov|mkv)$/i.test(ext)
        ? "video"
        : /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(ext)
        ? "image"
        : null;

    if (type) {
      return [{ name: entry.name, path: res.replace("public/", ""), type }];
    }
    return [];
  });
}

const list = getFiles(rootDir);
fs.writeFileSync(outFile, JSON.stringify(list, null, 2));
console.log(`✅ Generated ${outFile} with ${list.length} media files`);
