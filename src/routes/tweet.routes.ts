import {Router} from 'express'
import schemas from '../validations/schemas.js';
import validationYup from '../middlewares/validationYup.js';
import TweetController from '../controllers/tweet.controller.js';

import passport from 'passport';
import attachUserId from '../middlewares/attachUserId.js';
import validateUserIdToken from '../middlewares/validateUserId.js';

let tweetRouter = Router();
tweetRouter.use(passport.authenticate("jwt", { session: false }));
tweetRouter.use(attachUserId);
tweetRouter.use(validateUserIdToken);

tweetRouter.post("/",validationYup(schemas.createTweetSchema),TweetController.createTweet);

tweetRouter.get("/:userId",TweetController.getTweetsFromUser);

tweetRouter.get("/:tweetId",TweetController.getTweetById);

//tweetRouter.put("/",validationYup(schemas.updateTweetSchema),TweetController.updateTweetData);

tweetRouter.delete("/:tweetId",TweetController.updateTweetData);

tweetRouter.get("/getAllTweets",TweetController.getAllTweets);

tweetRouter.get("/getAllTweets",TweetController.getAllTweets);

export default tweetRouter;