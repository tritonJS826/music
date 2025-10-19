// generate_music_list.js
import fs from "fs";
import path from "path";

const rootDir = "./public/music";
const outFile = "./public/music.json";

function getFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(entry => {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getFiles(res);
    } else if (/\.(mp3|webm|wav|ogg)$/i.test(entry.name)) {
      return [{ name: entry.name, path: res.replace("public/", "") }];
    } else {
      return [];
    }
  });
}

const list = getFiles(rootDir);
fs.writeFileSync(outFile, JSON.stringify(list, null, 2));
console.log(`✅ Generated ${outFile} with ${list.length} tracks`);

