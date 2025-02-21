const express = require("express");
const axios = require("axios");

const router = express.Router();

// Route to fetch analysis data from the external API
router.get("/api/transactions/analysis", async (req, res) => {
    try {
        // Fetch transactions from MongoDB
        const transactions = await Transaction.find({});

        if (transactions.length === 0) {
            return res.json({
                analysis: "No transactions available.",
                transaction_count: 0,
                expenses: [] // ✅ Ensure expenses field exists
            });
        }

        // Aggregate expenses by category
        const expenses = transactions.reduce((acc, transaction) => {
            const category = transaction.category;
            const amount = transaction.amount;

            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += amount;

            return acc;
        }, {});

        // Convert object to array format for frontend charts
        const expensesArray = Object.keys(expenses).map(category => ({
            category,
            amount: expenses[category]
        }));

        res.json({
            analysis: "**Spending Analysis:** ...",
            transaction_count: transactions.length,
            expenses: expensesArray // ✅ Now included in API response
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// POST Route to get investment advice from Gemini API
router.post("/investment-advice", async (req, res) => {
    try {
      const transactions = req.body.transactions;
  
      if (!transactions || transactions.length === 0) {
        return res.status(400).json({ message: "No transactions provided" });
      }
  
      // 📌 Replace this with the actual Gemini AI API URL
      const geminiResponse = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${AIzaSyBPBm3Cz5OE4YuP_dvjujC5LglGbpJdb6U}", {
        transactions,
      });
  
      res.json({ advice: geminiResponse.data.suggestions });
      console.log(res.json);
    } catch (error) {
      console.error("Error fetching investment advice:", error);
      res.status(500).json({ message: "Failed to get investment advice" });
    }
  });
  

module.exports = router;