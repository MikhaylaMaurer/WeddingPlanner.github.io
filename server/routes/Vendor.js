// routes/vendors.js

const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");

router.post("/", async (req, res) => {
  try {
    const { user, vendors } = req.body;

    // Update or create vendor information for the user
    const result = await Vendor.findOneAndUpdate(
      { user },
      { vendors },
      { upsert: true, new: true }
    );

    res
      .status(200)
      .json({ message: "Vendor information saved successfully", result });
  } catch (error) {
    console.error("Error saving vendor information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch vendor information for a specific user
router.get("/:user", async (req, res) => {
  try {
    const { user } = req.params;

    // Find vendor information for the specified user
    const vendorInfo = await Vendor.findOne({ user });

    if (!vendorInfo) {
      return res.status(404).json({ message: "Vendor information not found" });
    }

    res.status(200).json({ vendors: vendorInfo.vendors });
  } catch (error) {
    console.error("Error fetching vendor information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
