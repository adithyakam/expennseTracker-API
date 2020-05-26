const handleRegister = (req, res, postgres, bcrypt) => {
  const { email, password } = req.body;

  console.log(email, password);

  const hash = bcrypt.hashSync(password);

  postgres
    .insert({
      hash: hash,
      email: email,
    })
    .into("login")
    .returning("email")
    .then(res.json("added successfully"))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleRegister: handleRegister,
};
