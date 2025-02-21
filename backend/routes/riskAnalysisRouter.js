const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/risk-analysis", async (req, res) => {
  try {
    const { savings } = req.body; // Extract savings field

    if (!savings) {
      return res.status(400).json({ message: "Savings amount is required" });
    }

    const response = await axios.post(
      "https://financebus.onrender.com/api/risk-analysis",
      { savings }, // Send only necessary data
      {
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching risk analysis:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: "Failed to fetch risk analysis data",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;
