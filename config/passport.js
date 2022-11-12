const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

// exports function
module.exports = app => {
  // passport init
  app.use(passport.initialize())
  app.use(passport.session())
  // set Local strategy
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true, failureFlash: true}, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('warning_msg', 'This Email is Not Registered！' ))
        }
        if (user.password !== password) {
          return done(null, false, req.flash('warning_msg', 'Password is Incorrect！' ))
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
