import { UserModel } from "../models/users.js";
import { loginUserValidator, registerUserValidator, updateProfileValidator } from "../validators/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const registerUser = async (req,res,next)=>{
     try {
          const { error, value} = registerUserValidator.validate(req.body);
          if(error){
               return res.status(422).json(error)
          }
          console.log(value)
          const user = await UserModel.findOne({ email: value.email});
          if(user){
               return res.status(409).json('User already exist');
          }
          const hashedPassword = bcrypt.hashSync(value.password,8);
          await UserModel.create({
               ...value,
               password: hashedPassword
          })

          res.json('User registered successfully');
     } catch (error) {
          next(error);
          
     }
};

export const loginUser = async (req,res,next)=>{
     try {
          const { error, value} = loginUserValidator.validate(req.body);
          if(error){
               return res.status(422).json(error);
          }
          const user = await UserModel.findOne({ email:value.email
          });
          if(!user){
               return res.status(404).json("User does not exist");
          }
          const correctPassword = bcrypt.compareSync(value.password, user.password);
          if(!correctPassword){
               return res.status(401).json("Invalid credentials");
          }
          const token = jwt.sign(
               {id: user.id}, process.env.JWT_PRIVATE_KEY,
               { expiresIn: "24hr"}
          );
          res.json({
               message: "User logged in ",
               accessToken: token
          });

          res.json('User registered successfully');

     } catch (error) {
          next(error);
          
     }
};

export const getProfile = async (req, res, next) => {
     try {
          //console.log(req.auth);
          const user = await UserModel
               .findById(req.auth.id)
               .select({ password: false});
          
          res.json(user);
     } catch (error) {
          next(error);
          
     }
};

export const updateProfile = async (req,res,next)=>{
     try {
          const { error, value} = updateProfileValidator.validate(req.body);
          if(error) {
               return res.status(422).json(error);
          }
          //find the user ID
          const user = await UserModel.findByIdAndUpdate(
               req.auth.id,
               value,
               { new: true}
          );
          if (!user){
               return res.status(404).json('User not found');
          }
          res.json('User updated successfully');
     } catch (error) {
          next(error);
          
     }
};

export const logoutUser = (req,res,next)=>{
     res.json('User registered successfully');
};


