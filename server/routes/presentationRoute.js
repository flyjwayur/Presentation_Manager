const express = require('express');
const { 
  showPresentations,
  showDetailPresentation,
  addPresentation,
  editPresentation,
  deletePresentation
} = require('../controllers/presentations.controller');
const presentationRouter = express.Router();

presentationRouter.get('/', (req, res) => res.send('We are at home, check /presentations to check presentaions'));
presentationRouter.get('/presentations', showPresentations);
presentationRouter.get('/presentations/:id', showDetailPresentation);
presentationRouter.post('/presentations', addPresentation);
presentationRouter.put('/presentations/:id' , editPresentation);
presentationRouter.delete('/presentations/:id', deletePresentation);

module.exports = presentationRouter;
