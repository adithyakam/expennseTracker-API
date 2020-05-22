const delItem = (req, res, postgres) => {
  const { email, id } = req.body;

  console.log(email, id);
  postgres("expenses")
    .where("id", "=", id)
    .andWhere("email", "=", email)
    .del()
    .then((data) => {
      postgres
        .select("*")
        .from("expenses")
        .where("email", "=", email)
        .then((user) => {
          res.json(user);
        });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  delItem: delItem,
};
