import express from "express";

const app = express();

app.get("/", (_req, res) => {
  console.log("Hello from Express!");
  res.status(200);
  res.json({ message: "Hello from JSON" });
});

export default app;
