import {Router} from 'express'
import UserController from '../controllers/user.controller.js';
import schemas from '../validations/schemas.js';
import validationYup from '../middlewares/validationYup.js';
let userRouter = Router();

import passport from 'passport';
import attachUserId from '../middlewares/attachUserId.js';
import validateUserIdToken from '../middlewares/validateUserId.js';

userRouter.use(passport.authenticate("jwt", { session: false }));
userRouter.use(attachUserId);
userRouter.use(validateUserIdToken);


userRouter.get(
    "/:userId",
    UserController.getUserData
);

userRouter.put(
    "/",
    validationYup(schemas.updateUserDataSchema),
    UserController.updateUserData
);

userRouter.delete(
    "/:userId",
    UserController.deleteUser
);




export default userRouter;