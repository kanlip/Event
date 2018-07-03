const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const nodemailer = require('nodemailer');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const errors = {
  REGISTER_USERNAME_TAKEN: 'username unavailable',
  REGISTER_GENERAL_ERROR: 'an error has occured',
  LOGIN_INVALID: 'invalid username/password',
  LOGIN_GENERAL_ERROR: 'sorry, an error has occured. please try again later',
};
function modelData(data) {
  const email = data.email;
  const name = data.name;
  const role = 'client';
  const facebookId = data.userID;
  const dataObjectModel = { name, local: { email: email }, role, 'facebook.facebookId': facebookId }
  return dataObjectModel;
}

router.post('/facebook', function (req, res, next) {
  const email = req.body.item.email;
  const modelUser = modelData(req.body.item);
  const facebookId = req.body.item.userID;
  User.findOneAndUpdate({ 'local.email': email }, modelUser, { new: true, upsert: true }, function (err, doc) {
    if (err) return res.status(500).send({ err: 'Error' })
    return res.status(200).send({user:doc})
  })
})

router.post('/login', function (req, res, next) {
  if (!req.body.item.username || !req.body.item.password) {
    return res.status(403).end();
  }
  const email = req.body.item.username
  User.findOne({ 'local.email': email }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ err: errors.LOGIN_GENERAL_ERROR });
    }
    else if (!user) {
      return res.status(500).json({ err: errors.LOGIN_GENERAL_ERROR });
    }
    if (user.local.password !== undefined && req.body.item.password !== undefined) {
      bcrypt.compare(req.body.item.password, user.local.password, function (err, isMatch) {
        if (err) throw err;

        if (isMatch) {
          console.log('matched')
          var token = jwt.sign({ 'id': user._id }, config.secret, {
            expiresIn: 31536e3
          });
          console.log(user)
          return res.json({
            user: {
              username: user.local.email,
              name: user.name,
              role: user.role
            },
            token: token,
          });
        }
        else {
          return res.status(500).json({ err: errors.LOGIN_INVALID });
        }
      });
    }
    else {
      return res.status(500).json({ err: errors.LOGIN_INVALID });
    }
  })
});


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user._id, iat: timestamp }, config.secret);
}
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'madi.today@gmail.com',
    pass: '767778Kanin'
  }
});
router.post('/signup', function (req, res, next) {
  req.body.item.role = 'client';
  const { email, password } = req.body.item.local
  User.findOne({ 'local.email': email }, function (err, existingUser) {
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    const user = new User(req.body.item);

    user.save(function (err) {
      if (err) {
        return next(err);
      }
      let mailOptions = {
        from: 'madi.today@gmail.com',
        to: email,
        subject: 'Thank you for signing up with madi today',
        html: '<p><b>Thank you</b> for signing up with us , Madi Today. <a href="https://www.madi.today">Enter our site to login.</a></p>'
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.json({
        token: tokenForUser(user), message: 'Signed up complete', user: {
          username: user.local.email,
          name: user.name,
          role: user.role
        }
      });
    });
  });
})


module.exports = router;