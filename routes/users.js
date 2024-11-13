import { Router} from "express";
import { registerUser, loginUser, logoutUser, getProfile, updateProfile} from '../controllers/users.js';
import {hasPermission, isAuthenticated} from "../middlewares/auth.js";
import { userAvatarUpload } from "../middlewares/upload.js";

const userRouter = Router();

userRouter.post('/users/register',userAvatarUpload.single('avatar'), registerUser);

userRouter.post('/users/login',loginUser);

userRouter.get('/users/me',isAuthenticated, hasPermission ('get_profile'), getProfile);

userRouter.post('/users/logout',logoutUser);

userRouter.patch('/users/me/:id', isAuthenticated, hasPermission('update_profile'), userAvatarUpload.single('avatar'), updateProfile);

export default userRouter;