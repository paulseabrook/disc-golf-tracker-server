// require Express
const express = require('express');

// handle 404 errors on update and delete
const { handle404 } = require('../lib/custom-errors');
const { requireToken } = require('../config/auth');

// require the Model we just created
const Pro = require('../models/pro');

// Creating a router for us to make paths on
const router = express.Router();

// CREATE
// POST /pros
router.post('/wins', requireToken, (req, res, next) => {
  // this is the id of the pro we want the win to be for
  // notice, this field is not in our schema for win
  const proId = req.body.win.proId;

  const win = req.body.win;
  win.owner = req.user._id;

  // find the pro that we want to add the win to
  Pro.findById(proId)
    // since we are searching by ID, we need to handle for 404 failure
    .then(handle404)
    // push the win into the wins Mongoose Array
    .then((pro) => {
      pro.wins.push(win);
      // because we modified a document, we MUST save
      // must return it to go to next .then
      return pro.save();
    })
    // on success, send a status of 201 created, send down the modified pro document
    .then((pro) => {
      // no return because if all successful, this should be the last action
      res.status(201).json({ pro: pro });
    })
    // if error
    .catch(next);
});

// UPDATE
router.patch('/wins/:winId', requireToken, (req, res, next) => {
  const proId = req.body.win.proId;
  const winBody = req.body.win;

  Pro.findById(proId)
    .then(handle404)
    .then((pro) => {
      const win = pro.wins.id(req.params.winId);

      // setting the new win content to be the content passed in
      win.set(winBody);

      // I have modified the doc I need to save it
      return pro.save();
    })
    // send a status of 204, no content
    .then(() => res.sendStatus(204))
    .catch(next);
});

// DELETE
router.delete('/wins/:winId', requireToken, (req, res, next) => {
  const proId = req.body.win.proId;

  Pro.findById(proId)
    .then(handle404)
    .then((pro) => {
      pro.wins.id(req.params.winId).remove();
      return pro.save();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
