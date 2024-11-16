import e from "express";
import addProfileMiddleware from "../Middleware/addProfileMiddleware.js";
import adoptedProfileMiddleware from "../Middleware/adoptedProfileMiddleware.js";
import updateRecordMiddleware from "../Middleware/updateRecordMiddleware.js";

const route = e.Router();

route.post("/addprofile", addProfileMiddleware);
route.post("/adoptedprofile", adoptedProfileMiddleware, updateRecordMiddleware);

export default route;
