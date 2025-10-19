import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const publicDir = path.join(__dirname, "public");

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(publicDir, { index: false }));

// ✅ SPA fallback for all non-file routes
app.use((req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
