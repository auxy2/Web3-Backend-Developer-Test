const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
};

const controlerRouter = require("./routes");

const port = 3000;
const app = express();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://personalemail8000:SirUPUcchBtIu3wM@skyshow.yqgndns.mongodb.net/Web3Teest",
      {
        family: 4,
        useNewUrlParser: true,
      }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.enable("trust proxy");

app.get("/", (req, res, next) => {
  res.send("welcome");
});
app.use("/api/V1/test", controlerRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server Runing On Port: ${port}`);
  });
});
