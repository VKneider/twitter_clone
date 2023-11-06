import {Router} from 'express'
import schemas from '../validations/schemas.js';
import validationYup from '../middlewares/validationYup.js';
import TweetController from '../controllers/tweet.controller.js';

import passport from 'passport';
import attachUserId from '../middlewares/attachUserId.js';
import validateUserIdToken from '../middlewares/validateUserId.js';

let tweetRouter = Router();
tweetRouter.use(passport.authenticate("jwt", { session: false }));



tweetRouter.post("/",validationYup(schemas.createTweetSchema),TweetController.createTweet);

tweetRouter.get("/user/:userId", attachUserId ,validateUserIdToken , TweetController.getTweetsFromUser);

tweetRouter.get("/tweet/:tweetId",attachUserId ,validateUserIdToken ,TweetController.getTweetById);

//tweetRouter.put("/",validationYup(schemas.updateTweetSchema),TweetController.updateTweetData);

tweetRouter.delete("/:tweetId",attachUserId ,validateUserIdToken ,TweetController.updateTweetData);

tweetRouter.get("/getAllTweets",attachUserId ,validateUserIdToken ,TweetController.getAllTweets);


export default tweetRouter;