// require mongoose
const mongoose = require('mongoose');

// Getting the Schema from Mongoose
const Schema = mongoose.Schema;

const winSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pro',
    },
  },
  {
    timestamps: true,
  }
);

// Exporting win model to use elsewhere
module.exports = winSchema;
