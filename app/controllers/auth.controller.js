const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    region: req.body.region,
    role: req.body.role,
  })
    .then((user) => {
      res.status(400).json({ message: "User registered successfully", user });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  const { username, email } = req.body;
  User.findOne({
    where: {
      [Op.or]: [{ email: email }, { username: username }],
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password",
        });
      }

      const token = jwt.sign({ username, role }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400,
      });

      res.status(200).json({ message: "Login Successful", token, role });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
