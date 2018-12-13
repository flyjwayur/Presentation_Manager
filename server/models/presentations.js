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
    type : Date,
    default : Date.now
  },
  keywords : {
    type : String
  }
});

const Presentation = mongoose.model('Presentation', PresentationSchema);

module.exports = Presentation;
