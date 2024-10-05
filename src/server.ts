import express from "express";
import router from "./router";
import morgan from "morgan";

const app = express();

// Middleware
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  console.log("Hello from Express!");
  res.status(200);
  res.json({ message: "Eu sou o payload desta API!" });
});

app.use("/api", router);

export default app;
