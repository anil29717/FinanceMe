import axios from "axios";

const API_URL_TRANSACTION = 'https://financebus-be9o.onrender.com/api/transactions';

const API_URL = "https://financebus-be9o.onrender.com/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addTransaction = async (transactionData) => {
  const response = await fetch(`${API_URL_TRANSACTION}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transactionData),
  });

  if (!response.ok) {
    throw new Error('Failed to add transaction');
  }
  return response.json();
};

export const fetchTransactions = async () => {
  const response = await fetch(API_URL_TRANSACTION);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
};

const analyzeTransactions = async () => {
  try {
    const response = await fetch("https://financebus-be9o.onrender.com/analyze-transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: currentUser.id, // Replace with logged-in user ID
        transactions: transactionList, // Replace with transaction data from state
      })
    });

    const data = await response.json();
    console.log("AI Analysis Response:", data);
  } catch (error) {
    console.error("Error sending transactions for analysis:", error);
  }
};


const BACK_URL = "https://financebus-be9o.onrender.com"; // Change this for production

// Fetch all goals
export const getGoals = async () => {
  try {
    const response = await axios.get(`${BACK_URL}/goals`);
    return response.data;
  } catch (error) {
    console.error("Error fetching goals:", error);
  }
};

// Add a new goal
export const addGoal = async (goalData) => {
  try {
    const response = await axios.post(`${BACK_URL}/goals`, goalData);
    return response.data;
  } catch (error) {
    console.error("Error adding goal:", error);
  }
};

// Fetch all loans
export const getLoans = async () => {
  try {
    const response = await axios.get(`${BACK_URL}/loans`);
    return response.data;
  } catch (error) {
    console.error("Error fetching loans:", error);
  }
};

// Add a new loan
export const addLoan = async (loanData) => {
  try {
    const response = await axios.post(`${BACK_URL}/loans`, loanData);
    return response.data;
  } catch (error) {
    console.error("Error adding loan:", error);
  }
};
