const { Schema, model } = require("mongoose");
const LiveSectionSchema = new Schema(
  {
    performerName: {
      type: String,
    },
    liveURL: {
      type: String,
    },
    comments: [],
  },
  { timestamps: true }
);

const LiveSectionModel = model("LiveSections", LiveSectionSchema);

module.exports = LiveSectionModel;
s