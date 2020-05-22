const handleMontlyAmt = (req, res, postgres) => {
  const { cat1, cat2, email } = req.body;
  console.log("1", cat1, cat2, email);

  postgres
    .select(
      postgres.raw("EXTRACT(MONTH FROM ??::date)", ["date"]),
      postgres.raw("Sum(amount)")
    )
    .returning("*")
    .from("expenses")
    .where("email", "=", email)
    .groupBy(postgres.raw("EXTRACT(MONTH FROM ??::date)", ["date"]))
    .then((pay) => {
      res.json(pay);
    })
    .catch((err) => res.status(400).json(err));
};

const handleOneCategoryMontly = (req, res, postgres) => {
  const { cat1, cat2, email } = req.body;
  console.log("3", cat1, cat2, email);

  postgres
    .select(
      postgres.raw("EXTRACT(MONTH FROM ??::date)", ["date"]),
      postgres.raw("Sum(amount)")
    )
    .returning("*")
    .from("expenses")
    .where("email", "=", email)
    .andWhere("category", "=", cat2)
    .groupBy(postgres.raw("EXTRACT(MONTH FROM ??::date)", ["date"]))
    .then((pay) => {
      res.json(pay);
    })
    .catch((err) => res.status(400).json(err));
};
const categoryWise = (req, res, postgres) => {
  const { cat1, cat2, email } = req.body;
  console.log("2", cat1, cat2, email);

  postgres
    .select("category", postgres.raw("Sum(amount)"))
    .returning("*")
    .from("expenses")
    .where("email", "=", email)
    .groupBy("category")
    .then((pay) => {
      res.json(pay);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleMontlyAmt: handleMontlyAmt,
  categoryWise: categoryWise,
  handleOneCategoryMontly: handleOneCategoryMontly,
};
