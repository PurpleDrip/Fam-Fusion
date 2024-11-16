import e from "express";
import registerOrganMiddleware from "../Controller/registerOrganController.js";
import registerUserMiddleware from "../Controller/registerUserController.js";
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
