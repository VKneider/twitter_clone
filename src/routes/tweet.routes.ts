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

tweetRouter.delete("/:tweetId",attachUserId ,validateUserIdToken ,TweetController.updateTweetData);

tweetRouter.post("/reply",validationYup(schemas.replySchema),TweetController.replyTweet);
//tweetRouter.put("/",validationYup(schemas.updateTweetSchema),TweetController.updateTweetData);

tweetRouter.get("/:tweetId",TweetController.getTweetById);
tweetRouter.get("/allTweets/:userId",TweetController.getAllTweets);
tweetRouter.get("/user/:userId", TweetController.getTweetsFromUser);
tweetRouter.get("/feed/:userId" ,TweetController.getFeed);
tweetRouter.get("/replies/:tweetId" ,TweetController.getTweetReplies);

export default tweetRouter;