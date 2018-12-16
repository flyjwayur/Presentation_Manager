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
      es.status(500).json({ title: "Internal server error", name: err.name, message: err.message });
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
  res.send("A new presentation has been added");
}

function editPresentation(req, res) {
  console.log("from put", req);
  const _id = req.params.id;
  Presentation.findOne({ _id }, (err, presentation) => {
    presentation.evaluator = req.body.evaluator;
    presentation.topic = req.body.topic;
    presentation.article = req.body.article;
    presentation.keywords = req.body.keywords;

    presentation
      .save()
      .then(() => {
        console.log("Saved");
        res.send("Presentation has been updated");
      })
      .catch(err => {
        res.status(404).send(err);
      });
  });
}

function deletePresentation(req, res) {
  const _id = req.params.id;
  Presentation.findByIdAndDelete({ _id }, (err, presentation) => {
    if (err) {
      res.status(404).send("Unable to delete the presentation");
    }
    res.send(`A presentation with id ${_id} has been removed.`);
  });
}
