import TweetModel from "../models/tweet.js";
import  { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import FollowerModel from "../models/follower.js";
import LikeModel from "../models/like.js";
import { ITweet } from "../models/tweet.js";

export default class TweetController {

    constructor() {}

    static createTweet = async (req: Request, res: Response) => {
        const { userId } = req.body;
        
        const tweet = new TweetModel({
            ...req.body,
            idUser: userId
        });

        const savedTweet = await tweet.save();

        if (!tweet) {
            return ApiResponse.error(res, "Error creating tweet", 400);
        }

        return ApiResponse.success(res, "Tweet created", tweet);
    }

    static getTweetsFromUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const { lastTweetDate } = req.query;

        try {
            let query: any = { idUser: userId, isReply: null, isDeleted: false };

            // Si se proporciona lastTweetDate, añade la condición de fecha en la consulta
            if (lastTweetDate) {
                query.createdAt = { $lt: new Date(lastTweetDate as string) };
            }

            const tweets = await TweetModel.find(query)
                .sort({ createdAt: -1 }) // Ordenar por fecha de creación descendente
                .limit(10)
                .populate("idUser", ["fullName", "username", "email"]); // Limitar la cantidad de tweets por solicitud

            if (!tweets || tweets.length === 0) {
                return ApiResponse.notFound(res, "No tweets found");
            }

            const likeCountsPromises = tweets.map(async (tweet) => {
                const likeCount = await LikeModel.find({ idTweet: tweet._id }).countDocuments();
                return { ...tweet.toObject(), likes: likeCount };
            });
    
            // Espera a que todas las consultas asincrónicas se completen
            let tweets2 = await Promise.all(likeCountsPromises as Promise<ITweet>[]);


            return ApiResponse.success(res, "Tweets retrieved", tweets2);
        } catch (error) {
            return ApiResponse.error(res, "Error getting tweets", 500);
        }
    }

    static getFeed = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const { lastTweetDate } = req.query;

        try {
            // Encuentra los usuarios que sigue el usuario actual
            const followingUsers = await FollowerModel.find({ idUser: userId }).distinct("idFollowing");

            // Agrega al usuario actual en la lista para incluir sus propios tweets en el feed
            followingUsers.push(userId);

            let query: any = { idUser: { $in: followingUsers } };

            // Si se proporciona lastTweetDate, añade la condición de fecha en la consulta
            if (lastTweetDate) {
                query.createdAt = { $lt: new Date(lastTweetDate as string) };
            }

            const tweets = await TweetModel.find(query)
                .sort({ createdAt: -1 })
                .limit(10)
                .populate("idUser", ["fullName", "username", "email"]); // Popula el usuario que hizo el tweet con los campos fullName, username y email

            if (!tweets || tweets.length === 0) {
                return ApiResponse.notFound(res, "No tweets found");
            }

            const likeCountsPromises = tweets.map(async (tweet) => {
                const likeCount = await LikeModel.find({ idTweet: tweet._id }).countDocuments();
                return { ...tweet.toObject(), likes: likeCount };
            });
    
            // Espera a que todas las consultas asincrónicas se completen
            let tweets2 = await Promise.all(likeCountsPromises as Promise<ITweet>[]);


            return ApiResponse.success(res, "Feed retrieved", tweets2);
        } catch (error) {
            return ApiResponse.error(res, "Error getting feed", 500);
        }
    }



    static getTweetById = async (req: Request, res: Response) => {
        const { tweetId } = req.params;

        try {
            const tweet = await TweetModel.findById(tweetId);
            if (!tweet) {
                return ApiResponse.notFound(res, "Tweet not found");
            }
            return ApiResponse.success(res, "Tweet retrieved", tweet);
        } catch (error) {
            return ApiResponse.error(res, "Error getting tweet", 500);
        }
    }

    static updateTweetData = async (req: Request, res: Response) => {
        
       
    }

    static getAllTweets = async (req: Request, res: Response) => {
        const { lastTweetDate } = req.query;
        const { limit = 10 } = req.query;

        try {
            let query: any = {};

            // Si se proporciona lastTweetDate, añade la condición de fecha en la consulta
            if (lastTweetDate) {
                query.createdAt = { $lt: new Date(lastTweetDate as string) };
            }

            let tweets = await TweetModel.find(query)
                .sort({ createdAt: -1 })
                .limit(parseInt(limit as string))
                .populate("idUser", ["fullName", "username", "email"]); // Popula el usuario que hizo el tweet con los campos fullName, username y email

                
                if (!tweets || tweets.length === 0) {
                    return ApiResponse.notFound(res, "No tweets found");
                }
                
                const likeCountsPromises = tweets.map(async (tweet) => {
                    const likeCount = await LikeModel.find({ idTweet: tweet._id }).countDocuments();
                    return { ...tweet.toObject(), likes: likeCount };
                });
        
                // Espera a que todas las consultas asincrónicas se completen
                let tweets2 = await Promise.all(likeCountsPromises as Promise<ITweet>[]);


            return ApiResponse.success(res, "Tweets retrieved", tweets2);
        } catch (error) {
            return ApiResponse.error(res, "Error getting tweets", 500);
        }
    }


}


