const express = require("express");
const LiveSectionModel = require("./schema");
const liveSectionsRouter = express.Router();

liveSectionsRouter.post("/addLiveSection", async (req, res, next) => {
  try {
    const newLiveSection = new LiveSectionModel(req.body);
    newLiveSection.save();
    res.send(newLiveSection._id);
  } catch (error) {
    next(error);
  }
});

liveSectionsRouter.post("/editSection/:name", async (req, res, next) => {
    try {
      const newLiveSection = new LiveSectionModel.findOne({performerName:req.header.name});
      console.log(newLiveSection)
      newLiveSection.save();
      res.send(newLiveSection._id);
    } catch (error) {
      next(error);
    }
  });


module.exports = liveSectionsRouter;
