const mongoose = require("mongoose");

// MongoDB Schema for AI Analysis Storage
const aiAnalysisSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
    aiInsights: Object, // Store AI response here
    createdAt: { type: Date, default: Date.now }
  });

const AIAnalysis = mongoose.model("AIAnalysis", aiAnalysisSchema);

export default AIAnalysis;
