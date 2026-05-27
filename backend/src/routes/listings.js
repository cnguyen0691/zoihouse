import express from "express";

const router = express.Router();

function adminOnly(req, res, next) {
  const isAdmin = req.headers["x-admin"] === "true";

  if (!isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }

  next();
}

let listings = [];

// POST /api/listings
router.post("/", adminOnly, (req, res) => {
  try {
    const property = req.body;

    const listing = {
      id: Date.now().toString(),

      title: property.address?.streetAddress || "",

      price: property.price || 0,

      address: {
        street: property.address?.streetAddress || "",
        city: property.address?.city || "",
        state: property.address?.state || "",
        zip: property.address?.zipcode || "",
      },

      details: {
        beds: property.bedrooms || 0,
        baths: property.bathrooms || 0,
        sqft: property.livingArea || 0,
      },

      images: property.images || [],

      createdAt: new Date().toISOString(),
    };

    listings.push(listing);

    return res.status(201).json({
      success: true,
      listing,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET /api/listings
router.get("/", (req, res) => {
  return res.json({
    success: true,
    listings,
  });
});

export default router;