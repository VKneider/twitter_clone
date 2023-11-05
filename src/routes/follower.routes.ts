import {Router} from 'express'
import schemas from '../validations/schemas.js';
import validationYup from '../middlewares/validationYup.js';
import followerController from '../controllers/follower.controller.js';

import passport from 'passport';

let followerRouter = Router();

followerRouter.use(passport.authenticate("jwt", { session: false }));

followerRouter.post("/follow",validationYup(schemas.followSchema),followerController.followUser);

followerRouter.post("/unfollow",validationYup(schemas.followSchema),followerController.unfollowUser);