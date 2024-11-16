import express from "express";
import forgotPasswordUser from "../controllers/forgotPasswordUser.js";
import resetPasswordUser from "../controllers/resetPasswordUser.js";

const router = express.Router();

router.post("/forgot-password", forgotPasswordUser);
router.post("/reset-password", resetPasswordUser);

export default router;
