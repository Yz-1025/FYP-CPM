import cors from "cors";
import express from "express";
import { config } from "./config.js";
import { connectDb } from "./db.js";
import cpmRouter from "./routes/cpm.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cpm", cpmRouter);

app.use((err, _req, res, _next) => {
  console.error("[api]", err.message || err);
  res.status(500).json({
    error: "Internal server error",
    detail: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

await connectDb();
app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});
