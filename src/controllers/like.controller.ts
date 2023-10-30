import TweetModel from "../models/tweet";
import  e, { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import LikeModel from "../models/like";

export default class LikeController {

    constructor() {}

    static likeTweet = async (req: Request, res: Response) => {
        const { userId, tweetId } = req.body;
        
        const like = await LikeModel.findOne({
            idUser: userId,
            idTweet: tweetId
        })

        if (like) {
            return ApiResponse.error(res, "Tweet alredy liked", 400);
        }

        return ApiResponse.success(res, "Tweet liked", like);
    }




}