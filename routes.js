const express = require("express");
const getusdt = require("./controller");

const router = express.Router();

router.post("/CovertFromUsdt", getusdt.USDTToFiat);
router.post("/ConvertToUsdt", getusdt.fiatToUSDT);

module.exports = router;
