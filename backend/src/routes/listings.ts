import express from "express";
import { db } from "../firebase";
import importListingRoute from "./importListing";

const router = express.Router();

// ✅ correct
router.use("/import", importListingRoute);

router.get("/", async (req, res) => {
  const snapshot = await db.collection("listings").get();

  res.json(
    snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  );
});

router.get("/:id", async (req, res) => {
  const doc = await db.collection("listings").doc(req.params.id).get();

  if (!doc.exists) {
    return res.status(404).json({ error: "Listing not found" });
  }

  res.json({ id: doc.id, ...doc.data() });
});

export default router;