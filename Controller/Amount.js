const handleAmt = (req, res, postgres) => {
  const { email, amount, category, date } = req.body;
  //   console.log("input", email, amount, category, date);

  postgres
    .insert({
      email: email,
      amount: amount,
      category: category,
      date: date,
    })
    .into("expenses")
    .then((data) => {
      postgres
        .select("*")
        .from("expenses")
        .where("email", "=", email)
        .then((user) => {
          res.json(user);
        });
    })
    .catch((err) => res.status(400).json("not adddin db"));
};

const getAmt = (req, res, postgres) => {
  const { email, amount, category, date } = req.body;
  console.log(req.body.date);

  postgres
    .select("*")
    .from("expenses")
    .where("email", "=", req.body.email)
    .andWhere(postgres.raw("EXTRACT(MONTH FROM date::date) = ?", [date]))
    .then((pay) => {
      res.json(pay);
    })
    .catch((err) => res.status(400).json("err"));
};

module.exports = {
  handleAmt: handleAmt,
  getAmt: getAmt,
};
