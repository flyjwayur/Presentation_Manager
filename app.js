const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const { MONGODB_URI } = require("./server/database/db");
const presentationRouter = require("./server/routes/presentationRoute");

const PORT = process.env.PORT || 5003;
const hostname = "localhost";

const app = express();

app.use(morgan("dev"));

const auth = (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers.authorization;
  
  if(!authHeader){
    const err= new Error('You are not authenticated!');

    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
  const auth = new Buffer.alloc(100, authHeader.split(' ')[1], 'base64').toString().split(':');

  const username = auth[0];
  const password = auth[1];

  if(username === 'admin' && password=== 'password' ){
    next();
  }
  else{
    const err= new Error('You are not authenticated!');

    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }

}

app.use(auth);

const options = {
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: 100, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

mongoose
  .connect(
    MONGODB_URI,
    options
  )
  .then(console.log("Databese is connected"))
  .catch(err => {
    console.log("there is err", err);
  });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(bodyParser.json());

// REST API end points under '/'
app.use("/", presentationRouter);

// if(process.env.node_env ==='production') {
// The catchall handler : if some request that does not match, send back React's index.html file
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });
//}

//For development
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/public/index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
