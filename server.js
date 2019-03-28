const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const { mongoURL } = require('./config/keys');
const presentationRouter = require('./server/routes/presentationRoute');
const userRouter = require('./server/routes/userRoute');
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 5005;
const hostname = 'localhost';

const app = express();

app.use(morgan('dev'));

//Set up the Mongo database
const options = {
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: 100, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
};

mongoose
  .connect(mongoURL, options)
  .then(console.log('Database is connected'))
  .catch(err => {
    console.log('there is err', err);
  });

const client = new MongoClient(mongoURL, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db('finlandForum').collection('devices');
  // perform actions on the collection object
  client.close();
});

// BodyParser decode data in different formats.
app.use(bodyParser.json());

// REST API end points under '/'
app.use('/api/presentations', presentationRouter);
app.use('/api/users', userRouter);

if (process.env.node_env === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '/client/build')));
  // The catchall handler : if some request that does not match, send back React's index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

app.listen(PORT, () => console.log(`Listening on ${hostname}:${PORT}`));
