const express = require("express");
const router = express.Router();
// const cors = require("cors");
const config = require("config");
const jwtSecret = config.get("secret");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser").json();
const User = require("../model/User");
// const User = mongoose.model("Users");

process.env.SECRET_KEY = jwtSecret;

router.get("/getreq", (req, res) => {
  console.log("Hello OWrld");
  res.send("Hello World Saboor");
  //   res.json({ name: "anees" }).status(200);
});

//userregister

router.post("/register", bodyParser, (req, res) => {
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  };

  User.findOne({ email: req.body.email })
    .then(userFind => {
      console.log("userFind", userFind);
      if (!userFind) {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(data => {
              console.log("userData after created", data);
              res.send(data);
            })
            .catch(err => {
              console.log("error", err);
              res.send("error", err);
            });
        });
      } else {
        console.log("user already exists");
        res.send("user already exists");
      }
    })
    .catch(err => {
      console.log("error", err);
      res.send("main error", err);
    });
});

router.post("/login", bodyParser, (req, res) => {
  User.findOne({ email: req.body.email })
    .then(loginFind => {
      if (loginFind) {
        if (bcrypt.compareSync(req.body.password, loginFind.password)) {
          const payload = {
            _id: loginFind._id,
            first_name: loginFind.first_name,
            last_name: loginFind.last_name,
            email: loginFind.email
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        } else {
          res.send("user is not exist");
        }
      } else {
        res.send("user is not exist");
      }
    })
    .catch(err => {
      res.send("main error is", err);
    });
});

router.get("/profile", bodyParser, (req, res) => {
  let decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.send("user does not exist");
      }
    })
    .catch(err => {
      res.send("main error", err);
    });
});

module.exports = router;
