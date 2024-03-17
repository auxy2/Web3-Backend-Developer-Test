const mongoose = require("mongoose");

BalanceSchema = mongoose.Schema({
  balance: String,
});

const Setbalance = mongoose.model("Balance", BalanceSchema);

module.exports = Setbalance;
