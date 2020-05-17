const handleChart = (req, res, postgres) => {
  const { cat1, cat2, email } = req.query;

  console.log("asda", cat1, cat2, email);

  // var query = require('url').parse(req.url,true).query;

  // var id = query.id;
  // var option = query.option;
  if (cat1 === "month") {
    console.log("IN");

    postgres
      .select("*")
      .returning("*")
      .from("expenses")
      //   .where("EXTRACT(MONTH FROM  date)", " = ", cat2)
      //   .WhereRaw(`EXTRACT(MONTH FROM date::date) = ?`, cat2)
      .where(postgres.raw("EXTRACT(MONTH FROM ??::date)", ["date"]), cat2)
      .andWhere("email", "=", email)
      .then((pay) => {
        res.json(pay);
      })
      .catch((err) => res.status(400).json(err));
  } else {
    res.json("cant");
  }
};

module.exports = {
  handleChart: handleChart,
};
