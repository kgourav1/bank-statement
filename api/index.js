const express = require("express");
const app = express();
const cors = require("cors");
const Transaction = require("./models/Transaction.js");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.get("/api/test", (req, res) => {
  res.json("test okay");
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, price, desc, datetime } = req.body;

  const transation = await Transaction.create({
    name,
    price,
    desc,
    datetime,
  });

  res.json(transation);
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(process.env.API_PORT);
