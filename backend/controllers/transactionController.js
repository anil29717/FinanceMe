const User = require("../models/User");

// Add a new transaction
exports.addTransaction = async (req, res) => {
  console.log("Transaction add API called with userId:", req.params.userId);
  try {
    const { userId } = req.params; // Get user ID from URL
    const { name, category, amount, date, description } = req.body;

    
    // Find user by userId
    const user = await User.findOne({ userId: userId });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Create transaction object
    const newTransaction = {
        name,
        category,
        amount,
        date,
        description,
    };

    // Add transaction to user's transactions array
    user.transactions.push(newTransaction);
    await user.save();

    res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
} catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Server error", error });
}
}


// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from URL

    console.log("Fetching transactions for userId:", userId);

    // ✅ Find user by userId (make sure it's treated as a string)
    const user = await User.findOne({ userId: String(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Return the transactions of the user
    res.status(200).json({ transactions: user.transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error" });
  }
};
