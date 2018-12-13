const Presentation = require('../models/presentations');

module.exports = {
  showPresentations,
  showDetailPresentation,
  addPresentation,
  editPresentation,
  deletePresentation
}

function showPresentations (req, res) {
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
}

function showDetailPresentation (req, res){
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
}

function addPresentation (req, res){
  const newPresentation = new Presentation(req.body);
  newPresentation
  .save()
  .then(()=>{
    console.log('Data is saved');
  })
  .catch(err => console.log('Error', err));
  res.send('A new presentation has been added');
}

function editPresentation (req, res) {
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
}

function deletePresentation (req, res) {
  const _id = req.params.id;
  Presentation.findByIdAndDelete({_id}, (err, presentation) => {
    if(err){
      res.status(404).send('Unable to delete the presentation')
    }
    res.send(`A presentation with id ${_id} has been removed.`);
  })
}
