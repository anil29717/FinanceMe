const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan'); // Import the model

// Create a Loan
router.post('/', async (req, res) => {
  try {
    console.log("post running");
    const newLoan = new Loan(req.body);
    await newLoan.save();
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Loans
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
