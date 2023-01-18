// require Express
const express = require('express');

// require the Model we just created
const Pro = require('../models/pro');

// Creating a router for us to make paths on
const router = express.Router();

// INDEX
// GET /pros
router.get('/pros', (req, res, next) => {
  Pro.find()
    .then((pros) => {
      return pros.map((pro) => pro);
    })
    .then((pros) => res.status(200).json({ pros: pros }))
    .catch(next);
});

// CREATE
// POST /pros
router.post('/pros', (req, res, next) => {
  Pro.create(req.body.pro)
    .then((pro) => {
      res.status(201).json({ pro: pro });
    })
    .catch(next);
});

// exporting the router to use elsewhere
module.exports = router;
