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



  

module.exports = router;
