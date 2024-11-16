import express from "express";
import loginUserMiddleware from "../Middleware/loginUserMiddleware.js";
import loginOrganMiddleware from "../Middleware/loginOrganMiddleware.js";

const router = express.Router();
router.post("/user", loginUserMiddleware);
router.post("/organ", loginOrganMiddleware);

export default router;
