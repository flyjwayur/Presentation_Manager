const express = require('express');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../config/config');
const { signUp, signIn } = require('../controllers/users.controller');
const userRouter = express.Router();


userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);

//For protected route
userRouter.get('/current', verifyToken, (req, res) => {
  jwt.verify(req.token, secretOrKey, function(err, data) {
    if (err) {
      //After login, no authorized right
      res.sendStatus(403);
    } else {
      console.log('data', data);
      res.json({message: 'A authorized user has been accessed ', data});
    }
  });
});


function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    //Split at the space
    const bearer = bearerHeader.split(' ');
    //Get token from an array
    const bearerToken = bearer[1];
    //set the token
    console.log('bearerToken', bearerToken);
    req.token = bearerToken;
    //Next middleware
    next();
  } else {
    // 401 : Unauthenticated
    return res.status(401).json({message: 'Token has not provided'});
  }
}

module.exports = userRouter;
