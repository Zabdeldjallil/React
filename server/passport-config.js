const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;
const mysql = require("mysql");
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("React", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
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
module.exports = function (passport) {
  passport.use(
    "local-login",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const user = await User.findAll({ where: { email: email } });
        if (user.length == 0) return done(null, false);
        bcrypt.compare(password, user[0].dataValues.password, (err, result) => {
          if (err) throw err;
          if (result === true) return done(null, user[0].dataValues);
          else return done(null, false);
        });
      }
    )
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
};
