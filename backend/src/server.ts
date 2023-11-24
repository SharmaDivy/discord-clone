import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

// ROUTES IMPORTs
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const server = http.createServer(app);

const PORT = parseInt(process.env.PORT || "");

mongoose
  .connect(process.env.MONGODB_CONNECTION_URI || "")
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server started at post: ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Failed to connect to mongodb...");
    console.error(e);
  });
