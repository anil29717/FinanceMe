const Transaction = require("../models/Transaction");
const axios = require("axios");

// ✅ Analyze Transactions
exports.analyzeTransactions = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from params

    // Fetch all transactions for the user
    const transactions = await Transaction.find({ userId });

    if (!transactions.length) {
      return res.status(400).json({ error: "No transactions found for analysis." });
    }

    // Send data to AI Model API
    const aiApiUrl = "https://your-ai-model.render.com/analyze"; // Replace with actual API
    const response = await axios.post(aiApiUrl, { transactions });

    // Save AI Analysis Result in Database (Optional)
    // Here, you can store the AI response inside a new MongoDB collection

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error analyzing transactions:", error);
    res.status(500).json({ error: "AI Analysis failed." });
  }
};
