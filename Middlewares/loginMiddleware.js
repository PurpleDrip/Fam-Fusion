const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  res.send("Hello World");
});

module.exports = router;
