import  { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import LikeModel from "../models/like.js";

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

        const newLike = new LikeModel({
            idUser: userId,
            idTweet: tweetId
        });

        await newLike.save();
        return ApiResponse.success(res, "Tweet liked", like);
    }

    static dislikeTweet = async (req: Request, res: Response) => {
        const { userId, tweetId } = req.body;

        const like = await LikeModel.findOne({
            idUser: userId,
            idTweet: tweetId
        })

        if (!like) {
            return ApiResponse.error(res, "Tweet not liked", 400);
        }

        await like.deleteOne();
        return ApiResponse.success(res, "Tweet disliked", like);
    }




}