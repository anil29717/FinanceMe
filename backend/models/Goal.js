const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  total_amount: {
    type: Number,
    required: true
  },
  due_amount: {
    type: Number,
    required: true
  },
  start_date: {
    type: Date,
    default: Date.now // Automatically stores the creation date
  },
  timeframe: {
    type: Number,
    required: true
  },
  emergency_fund: {
    type: Number,
    default: 20000
  }
});

module.exports = mongoose.model('Goal', GoalSchema);
