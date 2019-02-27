const Presentation = require('../models/presentations');
const validateAddPresentationInput = require('../validation/validatePresentations');

module.exports = {
  showPresentations,
  showDetailPresentation,
  addPresentation,
  editPresentation,
  deletePresentation,
};

function showPresentations(req, res) {
  Presentation.find({}, (err, presentations) => {
    if (presentations) {
      res.json(presentations);
    } else if (err) {
      res.status(500).json({
        title: 'Internal server error',
        name: err.name,
        message: err.message,
      });
    } else if (presentations.length < 1) {
      console.log('Presentations are not found');
      res
        .status(404)
        .json({ title: 'Not found', message: _id + ' does not exist' });
    }
  });
}

function showDetailPresentation(req, res, next) {
  const _id = req.params.id;
  Presentation.findOne({ _id }, (err, presentation) => {
    console.log('presentation:', presentation);

    if (presentation) {
      res.json(presentation);
    } else if (err) {
      console.log('from err', err);
      res.status(500).json({
        title: 'Internal server error',
        name: err.name,
        message: err.message,
      });
    } else if (presentation === null) {
      console.log('A presentation is not found');
      res
        .status(404)
        .json({ title: 'Not found', message: _id + ' does not exist' });
    }
  });
}

function addPresentation(req, res) {
  const { errors, isValid } = validateAddPresentationInput(req.body);
  if (!isValid) {
    console.log('how many times, !isValid', !isValid);
    return res.status(400).json({ title: 'validError', errors });
  }

  const newData = {
  
    presenter: req.body.presenter,
    evaluator: req.body.evaluator,
    topic: req.body.topic,
    article: req.body.article,
    date: req.body.date,
    keywords: req.body.keywords,
    summary: req.body.summary,
  };

  console.log('right before new ', newData);
  const newPresentation = new Presentation(newData);
  newPresentation
    .save()
    .then(data => {
      //console.log("A new presentation has been added");
      res.json({ newPresentation: data });
    })
    .catch(
      err => console.log('are we here ', err),
      //   res.status(500).json({
      //   title: "errorAddPresentation",
      //   name: err.name,
      //   message: err.message
      // }))
    );
}

function editPresentation(req, res) {
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
      .then(data => {
        console.log('data', data);
        console.log('Saved');
        console.log('presentation', presentation);
        res.json({ edittedPresentation: data });
      })
      .catch(err => {
        console.log('from edit', err);
        res.status(500).json({
          title: 'Unable to edit the presentation',
          name: err.name,
          message: err.message,
        });
      });
  });
}

function deletePresentation(req, res) {
  const _id = req.params.id;
  Presentation.findByIdAndDelete({ _id }, (err, presentation) => {
    if (presentation) {
      res.status(200).json(presentation);
      console.log(`A presentation with id ${_id} has been removed.`);
    } else if (err) {
      res.status(500).json({
        title: 'Unable to delete the presentation',
        name: err.name,
        message: err.message,
      });
    }
  });
}
