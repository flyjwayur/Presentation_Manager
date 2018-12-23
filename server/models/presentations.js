const mongoose = require('mongoose');

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
    type : Date
  },
  keywords : {
    type : String
  }
  ,summary : {
    type : String
  }
});

const Presentation = mongoose.model('PresentationsDB', PresentationSchema);

module.exports = Presentation;
