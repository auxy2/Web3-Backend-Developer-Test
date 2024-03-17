const express = require("express");
const getusdt = require("./controller");

const router = express.Router();

router.get("/CovertFromUsdt", getusdt.USDTToFiat);

module.exports = router;
