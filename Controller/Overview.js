const handleChart = (req, res, postgres) => {
  const { cat1, cat2, email } = req.query;

  //   console.log("asda", cat1, cat2, email);

  // SELECT   EXTRACT(MONTH FROM  date),Sum(Amount) FROM expenses
  // where  "email" = 'b@a.com'
  // group by EXTRACT(MONTH FROM  date)

  //Total expense month wise
  if (cat1 === "month") {
    postgres
      .select(
        postgres.raw("EXTRACT(MONTH FROM ??::date)", ["date"]),
        postgres.raw("Sum(amount)")
      )
      .returning("*")
      .from("expenses")
      //   .where("EXTRACT(MONTH FROM  date)", " = ", cat2)
      //   .WhereRaw(`EXTRACT(MONTH FROM date::date) = ?`, cat2)
      //   .where(postgres.raw("EXTRACT(MONTH FROM ??::date)", ["date"]), cat2)

      //   .andWhere("email", "=", email)
      .where("email", "=", email)
      .groupBy(postgres.raw("EXTRACT(MONTH FROM ??::date)", ["date"]))
      .then((pay) => {
        res.json(pay);
      })
      .catch((err) => res.status(400).json(err));
  } else {
    //totalexpense categor wise
    postgres
      .select("category", postgres.raw("Sum(amount)"))
      .returning("*")
      .from("expenses")
      // .where("category", "=", cat2)
      .andWhere("email", "=", email)
      .groupBy("category")
      .then((pay) => {
        res.json(pay);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = {
  handleChart: handleChart,
};
