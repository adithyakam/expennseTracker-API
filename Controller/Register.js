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
    .then((data) => res.json("added successfully"))
    .catch((err) => res.status(400).json("not addded db"));
};

module.exports = {
  handleRegister: handleRegister,
};
