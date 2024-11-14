const express = require("express");
const Router = express.Router();

Router.post("/", addProfileMiddleware);
Router.get("/", getProfileMiddleware);

module.exports = Router;
