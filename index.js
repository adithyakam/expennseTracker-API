const express = require("express");
const bodyParse = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
var knex = require("knex");
const login = require("./Controller/Login");
const register = require("./Controller/Register");
const amount = require("./Controller/Amount");
const overview = require("./Controller/Overview");

const postgres = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "root",
    database: "Expense",
  },
});

const app = express();

app.use(bodyParse.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("working");
});

app.post("/login", (req, res) => {
  login.handleSignin(req, res, postgres, bcrypt);
});

app.post("/Register", (req, res) => {
  register.handleRegister(req, res, postgres, bcrypt);
});

app.post("/Amount", (req, res) => {
  amount.handleAmt(req, res, postgres);
  amount.getAmt(req, res, postgres);
});

app.get("/overview", (req, res) => {
  overview.handleChart(req, res, postgres);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`running at ${process.env.PORT}`);
});
