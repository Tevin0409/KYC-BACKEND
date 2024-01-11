const express = require("express");
const cors = require("cors");
const passport = require("passport");

const app = express();
const db = require("./app/models");
const PORT = process.env.PORT || 8080;
// db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost;8081",
};

//Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

//Passport Local Strategy
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
    } catch (error) {
      return done(error);
    }
  })
);

//routes
require("./app/routes/auth.routes")(app);

// Sync DB with models
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});
