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
    .returning("email")

    .then(res.json("added successfully"))
    .catch((err) => res.status(400).json("not added to db"));
};

module.exports = {
  handleAmt: handleAmt,
};
