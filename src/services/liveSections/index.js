const express = require("express");
const LiveSectionModel = require("./schema");
const liveSectionsRouter = express.Router();
const mongoose = require("mongoose");

liveSectionsRouter.post("/addLiveSection", async (req, res, next) => {
  try {
    const newLiveSection = new LiveSectionModel(req.body);
    await newLiveSection.save();
    res.send(await LiveSectionModel.find());
  } catch (error) {
    next(error);
  }
});
liveSectionsRouter.delete("/deleteLiveSection/:id", async (req, res, next) => {
  try {
    const newLiveSection = await LiveSectionModel.findByIdAndDelete(
      mongoose.Types.ObjectId(req.params.id)
    );
    await newLiveSection.save();
    res.status = 200;
    res.send(await LiveSectionModel.find());
  } catch (error) {
    next(error);
  }
});
liveSectionsRouter.get("/getLiveSections", async (req, res, next) => {
  try {
    console.log("kur");
    const allSections = await LiveSectionModel.find();
    res.send(allSections);
  } catch (error) {
    next(error);
  }
});
liveSectionsRouter.post("/editSection/:name", async (req, res, next) => {
  try {
    const newLiveSection = new LiveSectionModel.findOne({
      performerName: req.header.name,
    });
    newLiveSection.save();
    res.send(newLiveSection._id);
  } catch (error) {
    next(error);
  }
});
liveSectionsRouter.post("/addComment/:id", async (req, res, next) => {
  try {
    const newLiveSection = await LiveSectionModel.findByIdAndUpdate(
     req.params.id,
      {
        $push: { "comments": req.body },
      },
      {
        new: true,
      }
    );
    newLiveSection.save();
    res.send(await LiveSectionModel.findById(req.params.id));
  } catch (error) {
    next(error);
  }
});
liveSectionsRouter.post("/addView/:id", async (req, res, next) => {
  try {
    const newLiveSection = await LiveSectionModel.findByIdAndUpdate(
     req.params.id,
      {
        $inc : {'views' : 1},
      },
      {
        new: true,
      }
    );
    newLiveSection.save();
    res.send(await LiveSectionModel.findById(req.params.id));
  } catch (error) {
    next(error);
  }
});
liveSectionsRouter.post("/addLike/:id", async (req, res, next) => {
  try {
    const newLiveSection = await LiveSectionModel.findByIdAndUpdate(
     req.params.id,
      {
        $inc : {'likes' : 1},
      },
      {
        new: true,
      }
    );
    newLiveSection.save();
    res.send(await LiveSectionModel.findById(req.params.id));
  } catch (error) {
    next(error);
  }
});
liveSectionsRouter.post("/addDislike/:id", async (req, res, next) => {
  try {
    const newLiveSection = await LiveSectionModel.findByIdAndUpdate(
     req.params.id,
      {
        $inc : {'dislikes' : 1},
      },
      {
        new: true,
      }
    );
    newLiveSection.save();
    res.send(await LiveSectionModel.findById(req.params.id));
  } catch (error) {
    next(error);
  }
});
module.exports = liveSectionsRouter;
