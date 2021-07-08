const { Schema, model } = require("mongoose");
const LiveSectionSchema = new Schema(
  {
    performerName: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    picPreview: {
      type: String,
    },
    likes: {
      type: Number,
    },
    dislikes: {
      type: Number,
    },
    views: {
      type: Number,
    },
    comments: [],
  },
  { timestamps: true }
);

const LiveSectionModel = model("LiveSections", LiveSectionSchema);

module.exports = LiveSectionModel;
