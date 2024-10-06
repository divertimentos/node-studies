import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
// import haltMiddleware from "./middlewares/halt";

const app = express();

// Middlewares;

// CORS
app.use(cors());

// Morgan
app.use(morgan("dev"));

// Middleware para permitir que o cliente nos envie JSON
app.use(express.json());

// Permite que o cliente escreva query strings
app.use(express.urlencoded({ extended: true }));

// Custom Middleware
// haltMiddleware(app);

app.get("/", (_req, res) => {
  console.log("Hello from Express!");
  res.status(200);
  res.json({ message: "Eu sou o payload desta API!" });
});

app.use("/api", router);

export default app;
