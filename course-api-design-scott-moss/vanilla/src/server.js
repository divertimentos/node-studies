const express = require("express");

const app = express();

app.get("/", (_req, res) => {
  console.log("Hello from Express!");
  res.status(200);
  res.json({ message: "Hello from JSON" });
});

module.exports = app;
