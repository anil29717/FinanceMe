const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal'); // Import the model

// Create a Goal
router.post('/', async (req, res) => {
  try {
    const newGoal = new Goal(req.body);
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
