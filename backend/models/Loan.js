const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  name: String,
  principleAmount: Number,
  rateOfInterest: Number,
  tenure: Number,
  emi: Number,
});

module.exports = mongoose.model('Loan', LoanSchema);
