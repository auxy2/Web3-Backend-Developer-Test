const axios = require("axios");

exports.fiatToUSDT = async (req, res, next) => {
  const { currency, usdtAmount } = req.body;

  try {
    // Here you would typically call an API to convert fiat to USDT
    // For the sake of example, let's assume we're using a hypothetical API

    // Make a request to the API
    const response = await axios(
      `https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=${currency}`
    );

    // Assuming the API returns the converted amount in USDT
    const amountInUSDT = response.data;

    res.status(200).json({
      data: amountInUSDT,
    });
  } catch (error) {
    res.send("Error converting fiat to USDT");
  }
};
