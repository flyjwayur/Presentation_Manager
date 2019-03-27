const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { secretOrKey } = require('../../config/keys');
const validateSignUpInput = require('../validation/validateSignUp');
const validateSignInInput = require('../validation/validateSignIn');

const signUp = (req, res) => {
  const { errors, isValid } = validateSignUpInput(req.body);

  console.log('errors', errors);
  console.log('isValid', isValid);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = 'A email already exist';
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(email, { s: '100', r: 'x', d: 'retro' }, true);
    const newUser = new User({ username, email, password, avatar });

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        console.log(salt);
        // Store hash in your password DB.
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            res.json({ success: true, message: 'A user is created' });
          })
          .catch(err => console.log(err));
      });
    });
  });
};

const signIn = (req, res) => {
  const { errors, isValid } = validateSignInInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'Incorrect email or password';
      return res.status(400).json(errors);
    }
    //Check password from user and password in DB
    bcrypt.compare(password, user.password).then(isMatch => {
      //When the password is matched
      if (isMatch) {
        //create JWT payload
        const payload = {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        };

        console.log('payload at user route:', payload);
        //Create Token
        jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: `Bearer ${token}` });
        });
      } else {
        //For security reason, give error like below than indicating 'password is incorrect'
        errors.password = 'Incorrect email or password';
        return res.status(400).json(errors);
      }
    });
  });
};

module.exports = {
  signUp,
  signIn,
};
