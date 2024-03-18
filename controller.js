const axios = require("axios");
const Balance = require("./model");
User: "Web3.0Dev",
  (exports.loadBalance = async (req, res) => {
    const user = await Balance.findOne({ User: "Web3.0Dev" });
    const balance = user.balance;
    res.status(200).json({
      balance,
    });
  });
exports.fiatToUSDT = async (req, res) => {
  const { currency, fiatAmount } = req.body;
  const availableBalance = await Balance.findOne({ User: "Web3.0Dev" });

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

    // await availableBalance.save();

    res.status(200).json({
      newbalance,
      rate: amount,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.USDTToFiat = async (req, res) => {
  const { currency, USDTAmount, ToUSDT = "USDT" } = req.body;
  console.log(req.body);

  const availableBalance = await Balance.findOne({ User: "Web3.0Dev" });

  try {
    const tetherResponse = await axios(
      `https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=${currency}`
    );
    const exchangeRatesToUSD = await axios(
      `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=USD`
    );

    const usdtRateToFiat = tetherResponse.data[currency];

    const currencyToUsdRate = exchangeRatesToUSD.data.USD;

    console.log("tetherResponse", usdtRateToFiat, currencyToUsdRate);

    /////// currencyAmount RATE //////////
    const currencyAmount = usdtRateToFiat * USDTAmount;

    const amount = currencyToUsdRate * currencyAmount; //good;

    const newbalance =
      parseFloat(availableBalance.balance) - parseFloat(amount);
    availableBalance.balance = newbalance.toLocaleString();
    // await availableBalance.save();
    console.log("amount", amount, "currencyAmount", currencyAmount, newbalance);

    res.status(200).json({
      newbalance,
      rate: currencyAmount,
    });
  } catch (error) {
    console.log(error.message);
  }
};
