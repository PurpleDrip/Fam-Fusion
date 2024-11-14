const express = require("express");
const router = express.Router();
const loginMiddleware = require("../Middlewares/loginMiddleware");
const checkforTokenMiddleware = require("../Middlewares/checkforTokenMiddleware");

router.post("/", loginMiddleware);
router.get("/", checkforTokenMiddleware);

module.exports = router;
