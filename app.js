const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
//const MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 5005;
const hostname = "localhost";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

const Schema = mongoose.Schema;

const PresentationSchema = new Schema({
  presenter : {
    type : String
  },
  evaluator : {
    type : String
  },
  topic : {
    type : String
  },
  article : {
    type : String
  },
  date : {
    type : Date,
    default : Date.now
  },
  keywords : {
    type : String
  }
});

const Presentation = mongoose.model('Presentation', PresentationSchema);

//URL from mlab
const uri = 'mongodb://presentationUser:pre123@ds231374.mlab.com:31374/projectdb'
// URL from mongodb atlas 
// const uri = 'mongodb+srv://presentationUser:presentation123@cluster0-fcivo.mongodb.net/test?retryWrites=true'
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
// // perform actions on the collection object
//   client.close();
// });


mongoose.connect(uri, { useNewUrlParser: true }).then(err => {
  if(err){
    console.log(err);
  }
  console.log('Databese is connected');
})

app.get('/presentations', (req, res) => {
  Presentation.find({}, (err, presentations) => {
    console.log(presentations); // how to print
    
    if(err){
      console.log('from err', err);  
      res.status(404).send('An error');
    }
    
    if(presentations.length < 1){
      console.log("A presentations is not found");
      res.send('A presentations was not found');
    }

    res.json(presentations);
  })
})

app.get('/presentations/:presenter', (req, res) => {
  const firstLetter = req.body.charAt(0).toUpperCase();
  const restLetter = req.body.substring(1);
  const presenter = firstLetter.concat(restLetter);

  Presentation.findOne({presenter}, (err, presentations) => {
    console.log(presentations); 
    
    if(err){
      console.log('from err', err);  
      res.status(404).send('An error');
    }
    
    if(presentations.length < 1){
      console.log("A presentations is not found");
      res.send('A presentations was not found');
    }

    res.json(presentations);
  })
})

app.post('/presentations', (req, res)=>{
  const newPresentation = new Presentation(req.body);
  newPresentation
  .save()
  .then(()=>{
    console.log('Data is saved');
  })
  .catch(err => console.log('Error', err));
  res.send('A new presentation has been added');
})

app.put('/presentations/:id', (req, res) => {
  console.log("from put", req);
  const _id = req.params.id
  Presentation.findOne({_id}, (err, presentation) => {
    presentation.evaluator = req.body.evaluator;
    presentation.topic = req.body.topic;
    presentation.article = req.body.article;
    presentation.keywords = req.body.keywords;
 

    presentation.save().then(()=>{
     
        console.log('Saved')
        res.send('Presentation has been updated');
      
    }).catch((err) => {
 
          res.status(404).send(err)
        
    })
  })
})

app.delete('/presentations/:id', (req, res) => {
  const _id = req.params.id;
  Presentation.findByIdAndDelete({_id}, (err, presentation) => {
    if(err){
      res.status(404).send('Unable to delete the presentation')
    }
    res.send(`A presentation with id ${_id} has been removed.`);
  })
})

app.listen(PORT, hostname, ()=>{
  console.log(`Server running at http://${hostname}:${PORT}`);
});
