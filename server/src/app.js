import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/test", (req, res) => {
  res.json("Hello world");
});
app.use("/api/v1/auth", authRouter);

export { app };
