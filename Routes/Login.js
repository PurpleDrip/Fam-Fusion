const express = require("express");
const router = express.Router();
const loginMiddleware = require("../Middlewares/loginMiddleware");
const cookiesMiddleware = require("../Middlewares/cookiesMiddleware");

router.post("/", cookiesMiddleware, loginMiddleware);

module.exports = router;
