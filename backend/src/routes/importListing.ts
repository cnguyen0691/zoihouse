import express from "express";
import axios from "axios";
import { db } from "../firebase";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: "Missing listing URL",
      });
    }

    // Extract Zillow zpid from URL
    const match = url.match(/(\d+)_zpid/);

    if (!match) {
      return res.status(400).json({
        error: "Invalid Zillow URL",
      });
    }

    const zpid = match[1];

    // RapidAPI Request
    const response = await axios.get(
  "https://zillo-realtime-scraper.p.rapidapi.com/property",
  {
    params: { zpid },
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "zillo-realtime-scraper.p.rapidapi.com",
    },
  }
);

console.log("RAPIDAPI RESPONSE:", response.data);
    const property = response.data;

    // Clean normalized response
   const listing = {
  title:
    property.address?.streetAddress || "",

  price: property.price || 0,

  address: {
    street:
      property.address?.streetAddress || "",

    city:
      property.address?.city || "",

    state:
      property.address?.state || "",

    zip:
      property.address?.zipcode || "",
  },

  details: {
    beds: property.bedrooms || 0,

    baths: property.bathrooms || 0,

    sqft: property.livingArea || 0,

    yearBuilt:
      property.yearBuilt || null,

    propertyType:
      property.homeType || "",
  },

  description:
    property.description || "",

  features: [],

  images:
    property.photos || [
      property.imgSrc,
    ],

  agent: {
    name: "",
    phone: "",
    image: "",
  },

  location: {
    lat:
      property.latitude || null,

    lng:
      property.longitude || null,
  },

  status:
    property.homeStatus || "For Sale",

  monthlyEstimate: 0,
};
    const docRef = await db
  .collection("listings")
  .add(listing);

res.json({
  id: docRef.id,
  ...listing,
});
  } catch (error: any) {
    console.error(
      error?.response?.data || error.message
    );

    res.status(500).json({
      error: "Failed to import listing",
    });
  }
});

export default router;