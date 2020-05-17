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
    .catch((err) => res.status(400).json("not adddin db"));
};

const getAmt = (req, res, postgres) => {
  const { email, amount, category, date } = req.body;
  postgres
    .select("*")
    .from("expenses")
    .where("email", "=", req.body.email)
    .then((pay) => {
      res.json(pay);
    })
    .catch((err) => res.status(400).json("cant retrive data"));
};

module.exports = {
  handleAmt: handleAmt,
  getAmt: getAmt,
};
