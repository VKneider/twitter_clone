import UserCollection, {IUser} from "../models/user.js";
import {Request,Response} from "express";


export default class authController{

    static login = async (req:Request,res:Response)=>{
        const {email,password} = req.body;

        const user = await UserCollection.findOne({email});
        
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }

        //Compare password
        const validPassword = await user.comparePassword(password);

        if(!validPassword){
            return res.status(400).json({message:"Invalid password"});
        }

        //Create token

        const token = await user.createToken(user);

        res.json({message:"User logged in", token:token});

    }

    static register = async (req:Request,res:Response)=>{

        const {email,username,password} = req.body;

        const userExists = await UserCollection.findOne({email});
        
        if(userExists){
            return res.status(400).json({message:"User with email already exists"});
        }

        const user = new UserCollection({
            email,
            username,
            password
        });

        await user.save();
        res.json({message:`User ${user.username} created`});
    }
    
} 