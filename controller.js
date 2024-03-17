const axios = require("axios");

exports.fiatToUSDT = async (req, res) => {
  const { currency, fiatAmount } = req.body;
  console.log(req.body);
  localStorage.setItem("preBalance", "1");

  try {
    const response = await axios(
      `https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies={${currency}}`
    );
    const currencyToLower = currency.toLowerCase();
    const amountInUSDT = response.data.tether[currencyToLower];
    amountInUSDT *= fiatAmount;
    const preBalance = localStorage.getItem("preBalance");
    let storageBalance;
    if (preBalance === "1" && currency !== "USD") {
      storageBalance = localStorage.getItem("balance");
      const response = await axios(
        `https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=${currency}`
      );
      const amountInLocalCurrency = response.data.tether[currencyToLower];
      storageBalance += amountInLocalCurrency;
      localStorage.setItem("balance", storageBalance.toString());
    } else {
      storageBalance += fiatAmount;
      localStorage.setItem("balance", storageBalance.toString());
    }

    res.status(200).json({
      USDTRate: amountInUSDT,
      balance: localStorage.getItem("balance"),
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.USDTToFiat = async (req, res) => {
  const { currency, usdtAmount } = req.body;

  console.log("its here");

  try {
    const response = await axios(
      `https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=${currency}`
    );
    const currencyToLower = currency.toLowerCase();
    var amountInLocalCurrency = response.data.tether[currencyToLower];
    amountInLocalCurrency *= usdtAmount;
    const storageBalance = localStorage.get("balace");

    if (currency !== "USD") {
      const response = await axios(
        `https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=${currency}`
      );
      const amountInLocalCurrency = response.data.tether[currencyToLower];
      storageBalance -= amountInLocalCurrency;
      localStorage.setItem("balance", storageBalance.toString());
    } else {
      storageBalance -= amountInLocalCurrency;
      localStorage.setItem("balance", storageBalance.toString());
    }

    res.status(200).json({
      fiatRate: amountInLocalCurrency,
      balance: localStorage.getItem("balance"),
    });
  } catch (error) {
    console.log(error.message);
  }
};
