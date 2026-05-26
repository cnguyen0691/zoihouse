import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import listingsRoute from "./routes/listings";

dotenv.config();

const app = express();

// ✅ MUST BE FIRST
app.use(express.json());
app.use(cors());

// routes
app.use("/api/listings", listingsRoute);

app.get("/api/projects", (_, res) => {
  res.json([{ id: 1, title: "Zoihouse Project" }]);
});

app.listen(5000, () => {
  console.log("Server running");
});