let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//quote schema definition
let QuoteSchema = new Schema(
  {
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
QuoteSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the QuoteSchema for use elsewhere.
module.exports = mongoose.model('quote', QuoteSchema);