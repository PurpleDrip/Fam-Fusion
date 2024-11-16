import express from "express";
import loginUserMiddleware from "../Middleware/loginUserMiddleware.js";
import loginOrganMiddleware from "../Middleware/loginOrganMiddleware.js";
import addTokenMiddleware from "../Middleware/addTokenMiddleware.js";
import addRefreshMiddleware from "../Middleware/addRefreshMiddleware.js";

const router = express.Router();
router.post(
  "/user",
  loginUserMiddleware,
  addTokenMiddleware,
  addRefreshMiddleware
);
router.post(
  "/organ",
  loginOrganMiddleware,
  addTokenMiddleware,
  addRefreshMiddleware
);

export default router;
