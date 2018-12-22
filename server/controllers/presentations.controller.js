const Presentation = require("../models/presentations");

module.exports = {
  showPresentations,
  showDetailPresentation,
  addPresentation,
  editPresentation,
  deletePresentation
};

function showPresentations(req, res) {
  Presentation.find({}, (err, presentations) => {

    if(presentations){
      res.json(presentations);
    }else if(err){
      console.log("from err", err);
      next(err);
      //res.status(500).json({ title: "Internal server error", name: err.name, message: err.message });
    }else if (presentations.length < 1) {
      console.log("A presentations is not found");
      res.status(404).json({ title: "Not found", message: _id + " does not exist" });
    }   
  });
}

function showDetailPresentation(req, res, next) {
  const _id = req.params.id;
  Presentation.findOne({ _id }, (err, presentation) => {
    console.log("presentation:", presentation);

    if (presentation) {
      res.json(presentation);
    } else if (err) {
      console.log("from err", err);
      res.status(500).json({ title: "Internal server error", name: err.name, message: err.message });
    } else if (presentation === null) {
      console.log("A presentations is not found");
      res.status(404).json({ title: "Not found", message: _id + " does not exist" });
    }
  });
}

function addPresentation(req, res) {
  const newPresentation = new Presentation(req.body);
  newPresentation
    .save()
    .then(() => {
      console.log("Data is saved");
    })
    .catch(err => console.log("Error", err));
  res.json(newPresentation);
  //res.send("A new presentation has been added");
}

function editPresentation(req, res) {
  console.log("from put", req.body);
  const _id = req.params.id;
  Presentation.findOne({ _id }, (err, presentation) => {

    presentation.presenter = req.body.presenter;
    presentation.evaluator = req.body.evaluator;
    presentation.topic = req.body.topic;
    presentation.article = req.body.article;
    presentation.date = req.body.date;
    presentation.keywords = req.body.keywords;
    presentation.summary = req.body.summary;

    presentation
      .save()
      .then(() => {
        console.log("Saved");
        console.log("presentation", presentation);
      })
      .catch(err => {
        console.log(err);
      });  
      res.json(presentation); 
  });
}

function deletePresentation(req, res) {
  const _id = req.params.id;
  Presentation.findByIdAndDelete({ _id }, (err, presentation) => {
    if(presentation){
      res.json(presentation);
      console.log(`A presentation with id ${_id} has been removed.`)
    }else if(err) {
      res.status(500).json({ title: "Unable to delete the presentation", name: err.name, message: err.message });
    }
  });
}
