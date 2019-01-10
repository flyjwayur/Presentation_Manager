//const MongoClient = require('mongodb').MongoClient;


module.exports = {
  // 1) URL from mlab
 // MONGODB_URI : //'mongodb://preUser:pre123@ds231374.mlab.com:31374/projectdb'
  // 2) URL from mongodb based on terminal & Robo 3T
  //MONGODB_URI : 'mongodb://localhost:27017/presentationsDB'
  // 3) URL from mongodb atlas 
  MONGODB_URI: 'mongodb+srv://chicken-soup_098:chicken-soup_098@presentations-fcivo.gcp.mongodb.net/test?retryWrites=true'
  // MONGODB_URI: 'mongodb+srv://presentationUser:presentation123@presentations-fcivo.gcp.mongodb.net/test?retryWrites=true'
  // const client = new MongoClient(uri, { useNewUrlParser: true });
  // client.connect(err => {
  //   const collection = client.db("test").collection("devices");
  // // perform actions on the collection object
  //   client.close();
  // });
}
