const express = require("express");
const cors = require("cors");
const authRoutes = require("./auth/auth.routes");

const app = express();
app.use(
  cors({
    origin: "*", // dev only
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);

module.exports = app;
