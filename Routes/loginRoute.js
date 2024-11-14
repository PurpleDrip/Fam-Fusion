const express = require("express");
const router = express.Router();
const loginMiddleware = require("../Middlewares/loginMiddleware");
const checkforTokenMiddleware = require("../Middlewares/checkforTokenMiddleware");
const loginorganMiddleware = require("../Middlewares/loginorganMiddleware");

router.post("/", loginMiddleware);
router.get("/", checkforTokenMiddleware);

router.post("/organ", loginorganMiddleware);

module.exports = router;
