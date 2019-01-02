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
// app.use (express.static (__dirname + '/client/public'));
// console.log('dirname', __dirname + '/client/public');

app.use(morgan("dev"));

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
    MONGODB_URI, options
  )
  .then(console.log("Databese is connected"))
  .catch(err => {
    console.log("there is err", err);
  });

//app.use(express.static(path.join(__dirname, "/client/build")));
app.use(bodyParser.json());
app.use("/", presentationRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}`);
});
