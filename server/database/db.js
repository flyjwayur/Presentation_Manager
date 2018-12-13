//const MongoClient = require('mongodb').MongoClient;

module.exports = {
  //URL from mlab
  MONGODB_URI : 'mongodb://presentationUser:pre123@ds231374.mlab.com:31374/projectdb'
  // URL from mongodb atlas 
  //  MONGODB_URI : 'mongodb+srv://presentationUser:presentation123@cluster0-fcivo.mongodb.net/test?retryWrites=true'
  // const client = new MongoClient(uri, { useNewUrlParser: true });
  // client.connect(err => {
  //   const collection = client.db("test").collection("devices");
  // // perform actions on the collection object
  //   client.close();
  // });
}
