const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/healthRoutes");
const residentRoutes = require("./routes/residentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Dorm Management API is running." });
});

app.use("/api/health", healthRoutes);
app.use("/api/residents", residentRoutes);
app.use("/api/auth", authRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

module.exports = app;
