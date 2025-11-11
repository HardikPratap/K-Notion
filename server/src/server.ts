import http from "http";
import app from "./index";
import { ENV } from "./config/env";
import mongoose from "mongoose";

const PORT = ENV.PORT || 5001;

const startServer = async () => {
  try {
    // MongoDB Connection
    await mongoose.connect(ENV.MONGO_URI);
    console.log("✅ MongoDB connected successfully");

    // Start Express Server
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server startup error:", err);
    process.exit(1);
  }
};

startServer();