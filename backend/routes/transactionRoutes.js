const express = require('express');
const router = express.Router(); // Assuming you have a Transaction model
const transactionController = require('../controllers/transactionController');


// Route for adding a transaction
router.post('/:userId/transactions/add', transactionController.addTransaction);

// Route for getting all transactions
router.get('/transactions/:userId', transactionController.getTransactions);

// Route to fetch analysis data from the external API
router.get("/analysis", async (req, res) => {
    try {
        const response = await fetch("https://financebus.onrender.com/api/analysis");
        console.log('Analysis is fetching');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching analysis data:", error.message);
        res.status(500).json({ error: "Failed to fetch analysis data" });
    }
});

router.get("/risk-analysis", async (req, res) => {
    try {
        const response = await fetch("https://financebus.onrender.com/api/risk-analysis");
        console.log('Analysis is fetching');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching analysis data:", error.message);
        res.status(500).json({ error: "Failed to fetch analysis data" });
    }
});


module.exports = router;
