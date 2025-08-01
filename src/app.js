import express from "express";
import cors from "cors";
import login from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import system from "./routes/system.routes.js";
import { limiter } from "./utils/limiter.js";
import rhRoute from "./routes/rh.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(limiter);
app.use("/api", login);
app.use("/api", system);
app.use("/api/rh", rhRoute);

export default app;
