const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Function to generate a random 5-digit User ID
const generateUserId = () => Math.floor(10000 + Math.random() * 90000).toString();


const transactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  userId: { type: String, unique: true, default: generateUserId }, // Auto-generate 5-digit ID
  salary: {type:String, default: 20000},
  fund: {type:String, default:20000},
  transactions: [transactionSchema],
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
