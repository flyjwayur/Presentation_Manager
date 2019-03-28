module.exports = {
  /****** Key for bcrypt *******/

  secretOrKey: process.env.SECRET_OR_KEY,

  /****** DB URI *******/

  // 1) URL from mlab
  // MONGODB_URI : //'mongodb://preUser:pre123@ds231374.mlab.com:31374/projectdb'
  // 2) URL from mongodb based on terminal & Robo 3T
  //MONGODB_URI : 'mongodb://localhost:27017/presentationsDB'
  // 3) URL from mongodb atlas
  mongoURI: process.env.MONGO_URI,
};
