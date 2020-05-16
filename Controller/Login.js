const handleSignin = (req, res, postgres, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("incorrect");
  }

  console.log(email, password);
  postgres
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      console.log(isValid);

      if (isValid) {
        return postgres
          .select("*")
          .from("login")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unabale to get usre"));
      } else {
        res.status(400).json("unabale to get usre");
      }
    })
    .catch((err) => res.status(400).json("wromng credential"));
};

module.exports = {
  handleSignin: handleSignin,
};
