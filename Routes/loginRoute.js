const express = require("express");
const router = express.Router();
const loginMiddleware = require("../Middlewares/loginMiddleware");
const checkforTokenMiddleware = require("../Middlewares/checkforTokenMiddleware");

router.post("/", checkforTokenMiddleware, loginMiddleware);

module.exports = router;
