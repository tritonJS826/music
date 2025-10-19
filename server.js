// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Чтобы корректно работать с __dirname в ES модуле
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Путь к папке public
const publicDir = path.join(__dirname, "public");

// Middleware для логирования запросов
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Раздаём статические файлы из public
// express.static сам умеет работать с URL-encoded путями
app.use(express.static(publicDir, { index: false }));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/index.html`);
});
