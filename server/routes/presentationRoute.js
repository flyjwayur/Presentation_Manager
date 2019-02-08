const express = require('express');
const { 
  showPresentations,
  showDetailPresentation,
  addPresentation,
  editPresentation,
  deletePresentation
} = require('../controllers/presentations.controller');
const presentationRouter = express.Router();

// presentationRouter.get('/', (req, res) => res.send('We are at home, check /presentations to check presentaions'));
presentationRouter.get('/', showPresentations);
presentationRouter.get('/:id', showDetailPresentation);
presentationRouter.post('/', addPresentation);
presentationRouter.put('/:id' , editPresentation);
presentationRouter.delete('/:id', deletePresentation);

module.exports = presentationRouter;
