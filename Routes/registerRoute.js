import e from "express";
import registerOrganMiddleware from "../Middleware/registerOrganMiddleware.js";
import registerUserMiddleware from "../Middleware/registerUserMiddleware.js";
import addTokenMiddleware from "../Middleware/addTokenMiddleware.js";
import addRefreshMiddleware from "../Middleware/addRefreshMiddleware.js";

const router = e.Router();

router.post(
  "/user",
  registerUserMiddleware,
  addTokenMiddleware,
  addRefreshMiddleware
);
router.post(
  "/organ",
  registerOrganMiddleware,
  addTokenMiddleware,
  addRefreshMiddleware
);

export default router;
