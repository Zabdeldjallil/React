const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("React", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
const app = express();
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(
  cors({
    origin: "http://localhost:1234", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require("./passport-config")(passport);
//require("./passport-config.cjs")(passport);
//pass(passport);

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue(email);
        return rawValue ? rawValue : null;
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);
/*(async function () {
  await User.sync({});
  console.log("The table for the User model was just (re)created!");
})();*/
app.post("/connection", (req, res, next) => {
  passport.authenticate("local-login", (err, user, info) => {
    if (err) throw err;
    if (!user) res.json({ message: "nope!" });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json({
          message: "working!",
          link: "/accueil",
          connected: req.user,
        });
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", async (req, res) => {
  /*console.log(req.body);
  res.json({ message: "working!" });*/
  const users = await User.findAll({ where: { email: req.body.email } });
  if (users.length == 0) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) throw err;
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        // Store hash in your password DB.
        const user = await User.create({
          email: req.body.email,
          password: hash,
        });
      });
    });

    res.json({ message: "working!", link: "/home" });
  } else res.json({ message: "Already registred" });
});
app.listen(8080, () => console.log("Listening on port 8080!"));
function pass(passport) {
  passport.use(
    new localStrategy(async (email, password, done) => {
      const user = await User.findAll({ where: { email: req.body.email } });
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result) return done(null, user);
        else return done(null, false);
      });
      /* User.findOne({ username: username }, (err, user) => {
          if (err) throw err;
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });*/
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser(async (id, cb) => {
    const user = await User.findAll({ where: { id: id } });
    const userInformation = {
      email: user.email,
    };
    cb(err, userInformation);
    /* User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });*/
  });
}
