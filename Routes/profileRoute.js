const express = require("express");
const Router = express.Router();
const addProfileMiddleware = require("../Middlewares/addProfileMiddleware");
const getProfileMiddleware = require("../Middlewares/getProfileMiddleware");
const deleteProfileMiddleware = require("../Middlewares/deleteProfileMiddleware");

Router.post("/", addProfileMiddleware);
Router.get("/", getProfileMiddleware);
Router.get("/:id", getProfileMiddleware);
Router.get("/removeprofile", deleteProfileMiddleware);

module.exports = Router;
