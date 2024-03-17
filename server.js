const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
};

const controlerRouter = require("./routes");

const port = 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.enable("trust proxy");

app.get("/", (req, res, next) => {
  res.send("welcome");
});
app.use("/api/V1/test", controlerRouter);

app.listen(port, () => {
  console.log(`server runing on ${port}`);
});
