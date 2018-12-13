const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const { MONGODB_URI } = require('./server/database/db');
const presentationRouter = require('./server/routes/presentationRoute');

const PORT = process.env.PORT || 5002;
const hostname = "localhost";

const app = express();

app.use(morgan("dev"));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(err => {
  if(err){
    console.log(err);
  }
  console.log('Databese is connected');
})

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(bodyParser.json());
app.use('/', presentationRouter);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


app.listen(PORT, hostname, ()=>{
  console.log(`Server running at http://${hostname}:${PORT}`);
});
