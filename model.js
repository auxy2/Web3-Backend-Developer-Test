const mongoose = require("mongoose");

const BalanceSchema = new mongoose.Schema({
  balance: Number,
  User: String,
});

const Setbalance = mongoose.model("Balance", BalanceSchema);

module.exports = Setbalance;
