const express = require("express");
const router = express.Router();
const registerMiddleware = require("../Middlewares/registerMiddleware");

router.post("/", registerMiddleware);

module.exports = router;
