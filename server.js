const express = require("express");

const controlerRouter = require("./routes");

const port = 3000;
const app = express();

app.get("/", (req, res, next) => {
  res.send("welcome");
});
app.use("/api/V1/test", controlerRouter);

app.listen(port, () => {
  console.log(`server runing on ${port}`);
});
