import TweetModel from "../models/tweet";
import  { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";

export default class TweetController {

    constructor() {}

    static createTweet = async (req: Request, res: Response) => {
        const { userId } = req.body;
        
        const tweet = new TweetModel({
            ...req.body,
            idUser: userId
        });

        if (!tweet) {
            return ApiResponse.error(res, "Error creating tweet", 400);
        }

        return ApiResponse.success(res, "Tweet created", tweet);
    }

    static getTweetsFromUser = async (req: Request, res: Response) => {
        const { userId } = req.params;

        const tweets = await TweetModel.find({ idUser: userId });

        if (!tweets) {
            return ApiResponse.error(res, "Error getting tweets", 400);
        }

        return ApiResponse.success(res, "Tweets retrieved", tweets);
    }

    static getTweetById = async (req: Request, res: Response) => {

    }

    static updateTweetData = async (req: Request, res: Response) => {

    }


}