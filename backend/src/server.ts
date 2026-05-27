import express from "express";
import cors from "cors";
import listingsRoute from "./routes/listings";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/listings", listingsRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});