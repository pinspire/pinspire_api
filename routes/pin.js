import { Router } from "express";
import { addPin, getPins, getOnePin, updatePin, deletePin} from "../controllers/pin.js";
import { userAvatarUpload } from "../middlewares/upload.js";

//create router here
const pinRouter = Router();

//routes are defined here
pinRouter.post("/pins",  userAvatarUpload.single("image"), addPin);

pinRouter.get("/pins", getPins);

pinRouter.get("/pins/:id", getOnePin);

pinRouter.patch("/pins/:id", updatePin);

pinRouter.delete("/pins/:id", deletePin);

//export router
export default pinRouter;