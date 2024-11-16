import express from "express";
import loginUserMiddleware from "../Middleware/loginUserMiddleware.js";

const router = express.Router();
router.post("/user", loginUserMiddleware);

export default router;
