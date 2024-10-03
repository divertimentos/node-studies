import express from "express";
import router from "./router";

const app = express();

app.get("/", (_req, res) => {
  console.log("Hello from Express!");
  res.status(200);
  res.json({ message: "Fala monstro" });
});

app.use("/api", router);

export default app;
