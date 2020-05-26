const express = require("express");
const bodyParse = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
var knex = require("knex");
const login = require("./Controller/Login");
const register = require("./Controller/Register");
const amount = require("./Controller/Amount");
const overview = require("./Controller/Overview");
const del = require("./Controller/Delete");

const postgres = knex({
  client: "pg",
  connection: {
    // host: "127.0.0.1",
    // user: "postgres",
    // password: "root",
    // database: "e2",

    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();

app.use(bodyParse.json());
// app.use(cors());

app.get("/", (req, res) => {
  res.json("working");
});

app.post("/login", (req, res) => {
  login.handleSignin(req, res, postgres, bcrypt);
});

app.post("/items", (req, res) => {
  login.getItems(req, res, postgres);
});

app.post("/Register", (req, res) => {
  register.handleRegister(req, res, postgres, bcrypt);
});

app.post("/Amount", (req, res) => {
  amount.handleAmt(req, res, postgres);
  // amount.getAmt(req, res, postgres);
});

app.post("/getAmount", (req, res) => {
  amount.getAmt(req, res, postgres);
});

app.post("/delete", (req, res) => {
  del.delItem(req, res, postgres);
  // del.getItems(req, res, postgres);
});

app.post("/overview", (req, res) => {
  const { cat1, cat2, email } = req.body;
  console.log("i/p", cat1, cat2, email);

  if (cat1 === "month") {
    overview.handleMontlyAmt(req, res, postgres);
  } else {
    if (cat2) {
      overview.handleOneCategoryMontly(req, res, postgres);
    } else {
      overview.categoryWise(req, res, postgres);
    }
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`running at ${process.env.PORT}`);
});
