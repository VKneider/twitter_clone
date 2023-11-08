import UserCollection, { IUser } from "../models/user.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Request, Response } from "express";

export default class UserController {

    static deleteUser = async (req: Request, res: Response) => {
        const { userId: id } = req.body;
        const user = await UserCollection.findById(id);
        if (!user) {
            return ApiResponse.notFound(res, "User not found");
        }

        await user.deleteOne();
        return ApiResponse.success(res, "User deleted");
    }

    static getUserData = async (req: Request, res: Response) => {
        const { userId: id } = req.body;
        const user = await UserCollection.findById(id);
        if (user) {
            return ApiResponse.success(res, "User found", {
                username: user.username,
                email: user.email
            });
        } else {
            return ApiResponse.notFound(res, "User not found");
        }
    }

    static updateUserData = async (req: Request, res: Response) => {
        const { userId: id } = req.body;
        const user = await UserCollection.findById(id);
        if (!user) {
            return ApiResponse.notFound(res, "User not found");
        }

        const updated = await user.updateData(req.body);
        if (!updated) {
            return ApiResponse.error(res, "Error updating user", 400);
        }

        return ApiResponse.success(res, "User updated");
    }

    static searchUser = async (req: Request, res: Response) => {
        const { query } = req.params;
        const users = await UserCollection.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } }
            ]
        });

        if (!users) {
            return ApiResponse.notFound(res, "Users not found");
        }

        return ApiResponse.success(res, "Users found", users);
    }

    static getProfileData = async (req: Request, res: Response) => {
        const { userId: id } = req.params;
        const user = await UserCollection.findById(id);


        if (!user) {
            return ApiResponse.notFound(res, "User not found");
        }

        //get the ammount of followers
        const followers = await UserCollection.find({idFollowing: id}).countDocuments();
        const following = await UserCollection.find({idUser: id}).countDocuments();
        const tweets = await UserCollection.find({idUser: id}).countDocuments();


        return ApiResponse.success(res, "User found", {
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            bio: user.bio,
            profilePicture: user.profilePicture,
            isVerified: user.isVerified,
            followers: followers,
            following: following,
            tweets: tweets
        });
    }
    

}

