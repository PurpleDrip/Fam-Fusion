const express = require("express");
const router = express.Router();
const registerMiddleware = require("../Middlewares/registerMiddleware");
const registerorganMiddleware = require("../Middlewares/registerorganMiddleware");

router.post("/user", registerMiddleware);
router.post("/organ", registerorganMiddleware);

module.exports = router;
