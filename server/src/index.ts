import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authroutes";
import brainRoutes from "./routes/brainroutes";
import linkRoutes from "./routes/linkroutes";
import noteRoutes from "./routes/noteroutes";
import shareRoutes from "./routes/shareroutes";
import { errorHandler } from "./middleware/errormiddleware";
import { ENV } from "./config/env";

const app = express();

app.use(helmet());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

// Base route
app.get("/", (req, res) => res.json({ success: true, message: "Second Brain API" }));

// Mount APIs
app.use("/api/auth", authRoutes);
app.use("/api/brains", brainRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/share", shareRoutes);

// Error handler
app.use(errorHandler);

export default app;