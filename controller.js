const axios = require("axios");
const Balance = require("./model");
User: "Web3.0Dev",
  (exports.loadBalance = async (req, res) => {
    const balance = await Balance.findOne({ User: "Web3.0Dev" });
    res.status(200).json({
      balance,
    });
  });
exports.fiatToUSDT = async (req, res) => {
  const { currency, fiatAmount } = req.body;
  console.log(req.body);
  const availableBalance = await Balance.findOne({ User: "Web3.0Dev" });
  console.log("Uper", availableBalance.balance);

  try {
    const tetherResponse = await axios(
      `https://api.coincap.io/v2/assets/tether`
    );
    const exchangeRatesResponse = await axios(
      `https://api.exchangeratesapi.net/v1/exchange-rates/latest?access_key=CKTQNCaTsT3DKXLf`
    );
    const usdtRateToUSD = tetherResponse.data.data.priceUsd;
    const usdRate = exchangeRatesResponse.data.rates[currency];
    const convertToUsd = usdRate * fiatAmount;
    const amount = convertToUsd * usdtRateToUSD;

    const newbalance =
      parseFloat(availableBalance.balance) + parseFloat(amount);
    availableBalance.balance = newbalance.toLocaleString();
    await availableBalance.save();

    console.log(newbalance.toLocaleString());
    res.status(200).json({
      newbalance,
      rate: amount,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.USDTToFiat = async (req, res) => {
  const { currency, USDTAmount } = req.body;

  console.log(req.body);

  const availableBalance = await Balance.findOne({ User: "Web3.0Dev" });
  console.log("Uper", availableBalance.balance);

  try {
    const tetherResponse = await axios(
      `https://api.coincap.io/v2/assets/tether`
    );
    const exchangeRatesResponse = await axios(
      `https://api.exchangeratesapi.net/v1/exchange-rates/latest?access_key=CKTQNCaTsT3DKXLf`
    );
    const usdtRateToUSD = tetherResponse.data.data.priceUsd;

    const convertToUsd = usdtRateToUSD * USDTAmount;
    const usdRate = exchangeRatesResponse.data.rates[currency];

    const amount = convertToUsd * usdRate;

    const newbalance =
      parseFloat(availableBalance.balance) - parseFloat(amount);
    availableBalance.balance = newbalance.toLocaleString();
    await availableBalance.save();

    console.log(newbalance.toLocaleString());
    res.status(200).json({
      newbalance,
      rate: amount,
    });
  } catch (error) {
    console.log(error.message);
  }
};
