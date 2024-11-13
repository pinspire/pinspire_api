import { UserModel } from "../models/users.js";
import { expressjwt } from "express-jwt";
import { permissions } from "../utils/rbac.js";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ['HS256']
});


export const hasPermission = (action) => {
    return async (req, res, next) => {
        try {
            const user = await UserModel.findById(req.auth.id);
            
            // Check if the user was found
            if (!user) {
                return res.status(404).json('User not found!');
            }

            const permission = permissions.find(value => value.role === user.role);

            // Check if a matching permission was found
            if (!permission) {
                return res.status(403).json('No permission found!');
            }

            // Check if the action is allowed
            if (permission.actions.includes(action)) {
                next();
            } else {
                res.status(403).json('Action not allowed!');
            }
        } catch (error) {
            next(error);
        }
    };
};
