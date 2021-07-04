const express = require("express");
const { authenticate, refreshToken, cryptPassword } = require("../auth/tools");
const ProfileModel = require("./schema");
const profilesRouter = express.Router();
const { authorize } = require("../auth/middleware");
profilesRouter.post("/register", async (req, res, next) => {
  try {
    const password = await cryptPassword(req.body.password);
    req.body["password"] = password;
    const newUser = new ProfileModel(req.body);
    newUser.save();
    res.send(newUser._id);
  } catch (error) {
    next(error);
  }
});

profilesRouter.post("/login", async (req, res, next) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    const user = await ProfileModel.findByCredentials(email, password, {
      new: true,
    });
    console.log(user)
    user.online = true;
    user.save();
    const tokens = await authenticate(user);
    res.send([tokens,user]);
  } catch (error) {
    next(error);
  }
});
profilesRouter.post("/logOut",authorize, async (req, res, next) => {
  try {
    const user = await ProfileModel.findOne({name:req.user.name});
    user.online=false
    user.save();
    res.send("logged out");
  } catch (error) {
    next(error);
  }
});

profilesRouter.get("/getOnlineProfiles", async (req, res, next) => {
  try {
    const users = await ProfileModel.getOnlineUsers({
      new: true,
    });
    res.send(users);
  } catch (error) {
    next(error);
  }
});
module.exports = profilesRouter;
