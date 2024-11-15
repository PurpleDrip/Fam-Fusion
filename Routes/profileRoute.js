const express = require("express");
const Router = express.Router();
const addProfileMiddleware = require("../Middlewares/addProfileMiddleware");
const getProfileMiddleware = require("../Middlewares/getProfileMiddleware");

Router.post("/", addProfileMiddleware);
Router.get("/", getProfileMiddleware);

module.exports = Router;
