import UserCollection, { IUser } from "../models/user.js";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.js";

export default class authController {
    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await UserCollection.findOne({ email });

        if (!user) {
            return ApiResponse.error(res, "User does not exist");
        }

        const validPassword = await user.comparePassword(password);

        if (!validPassword) {
            return ApiResponse.error(res, "Invalid password");
        }

        const token = await user.createToken(user);

        return ApiResponse.success(res, "User logged in", { token });
    };

    static register = async (req: Request, res: Response) => {
        const { email, username, password } = req.body;

        const userExists = await UserCollection.findOne({ email });

        if (userExists) {
            return ApiResponse.error(res, "User with email already exists");
        }

        const user = new UserCollection({
            email,
            username,
            password,
        });

        await user.save();
        return ApiResponse.success(res, `User ${user.username} created`, null);
    };
}
