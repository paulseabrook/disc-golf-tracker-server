const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      // unique field means it must be unique amongst documents
      // if not unique, don't create it (maybe we will learn some error handling for this?)
      unique: true,
    },
    password: {
      // this will be the hashed value
      type: String,
      required: true,
    },
    // notice this is not required
    // this means we can start off without one, get one later
    //
    token: String,
  },
  {
    timestamps: true,
    // when a JSON function is called on document, it runs this below
    toJSON: {
      // the virtual allows us to delete the password so that we don't get back the user's password
      // it deletes the password, but does not make those changes to our DB, so our password is safe there
      virtuals: true,
      // _doc is the document it is representing
      // user is the user
      transform: (_doc, user) => {
        // delete the password off of the created user
        // they would only have an email and a token, not
        delete user.password;
        return user;
      },
    },
  }
);

module.exports = mongoose.model('User', userSchema);
