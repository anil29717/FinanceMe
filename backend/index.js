const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes.js');
const riskAnalysisRouter = require('./routes/riskAnalysisRouter.js');
const aiModelRoutes = require('./routes/aiModelRoutes.js');
// const goalAndLoanRoutes = require('./routes/goalAndLoanRoutes.js');


dotenv.config(); // Load environment variables
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://finance-frontend-phi.vercel.app/', // Update with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {  useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Sample Route
app.get('/', (req, res) => {
  res.send('FinanceMe Backend Running!');
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use('/api/users', userRoutes);
app.use('/api/users', transactionRoutes);
// app.use("/api/ai-analysis", aiModelRoutes);/


// Routes
app.use('/api/transactions', transactionRoutes);

// Use the risk analysis route
app.use('/api', riskAnalysisRouter);

// Routes
app.use('/goals', require('./routes/goalRoutes'));
app.use('/loans', require('./routes/loanRoutes'));



