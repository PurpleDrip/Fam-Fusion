import express from "express";
import filteredProfileMiddleware from "../Middleware/filteredProfileMiddleware.js";

const router = express.Router();

router.get("/:filter/:value/:minAge/:maxAge", filteredProfileMiddleware);

export default router;
