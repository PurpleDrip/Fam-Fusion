import e from "express";
import addProfileMiddleware from "../Controller/addProfileController.js";
import adoptedProfileMiddleware from "../Controller/adoptedProfileController.js";
import updateRecordMiddleware from "../Controller/updateRecordController.js";

const route = e.Router();

route.post("/addprofile", addProfileMiddleware);
route.post("/adoptedprofile", adoptedProfileMiddleware, updateRecordMiddleware);

export default route;
