// require mongoose
const mongoose = require('mongoose');

// Getting the Schema from Mongoose
const Schema = mongoose.Schema;

// Creating a new character Schema
const proSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    pdgaNumber: {
      type: Number,
      required: true,
    },
    sponser: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Creating a Mongoose Model called Pro
// Collection will be called pros
const Pro = mongoose.model('Pro', proSchema);

// Exporting Character model to use elsewhere
module.exports = Pro;
