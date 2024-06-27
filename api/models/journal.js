/*const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  entry: {
    type: String,
    required: true,
  },
  __v: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  compound: Number,

  emotion: {
    type: String,
    enum: ["positive", "negative", "neutral"],
    default: "neutral",
  },
  neutral: Number,
  negative: Number,
  positive: Number,
  sentiment_scores: {
    type: Object,
    default: {},
  },
});

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
*/
