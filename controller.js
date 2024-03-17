const axios = require("axios");


export 



exports.USDTToFiat = async (req, res) => {
  //   const { currency, usdtAmount, balance } = req.body;
  const currency = "USD";

  try {
    const response = await axios(
      `https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=${currency}`
    );
    const currencyToLower = currency.toLowerCase();
    const amountInLocalCurrency = response.data.tether[currencyToLower];
    const fiatAmount = amountInLocalCurrency * 10;
    const storageBalance = localStorage.get("balace");


    if (currency !== "USD") {
      const response = await axios(
        `https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=${currency}`
      );
      const amountInLocalCurrency = response.data.tether[currencyToLower];
      storageBalance -= amountInLocalCurrency;
      localStorage.setItem("balance", storageBalance.toString());
    } else {
     storageBalance -= fiatAmount
      localStorage.setItem("balance", storageBalance.toString());
    }

    res.status(200).json({
      fiatAmount,
      balance: localStorage.getItem("balance")
    });
  } catch (error) {
    console.log(error.message);
  }
};
