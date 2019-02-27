const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PresentationSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  presenter: {
    type: String,
    required: true,
    minlength: 2,
  },
  evaluator: {
    type: String,
    required: true,
    minlength: 2,
  },
  topic: {
    type: String,
    required: true,
    minlength: 2,
  },
  article: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  keywords: {
    type: String,
  },
  summary: {
    type: String,
  },
});

const Presentation = mongoose.model('PresentationsDB', PresentationSchema);

module.exports = Presentation;
