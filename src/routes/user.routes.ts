import {Router} from 'express'
import UserController from '../controllers/user.controller.js';
import schemas from '../validations/schemas.js';
import validationYup from '../middlewares/validationYup.js';
import passport from 'passport';
let userRouter = Router();

userRouter.use(passport.authenticate("jwt", { session: false }));

userRouter.get(
    "/",
    validationYup(schemas.idSchema),
    UserController.getUserData
);

userRouter.put(
    "/",
    validationYup(schemas.updateUserDataSchema),
    UserController.updateUserData
);

userRouter.delete(
    "/",
    validationYup(schemas.idSchema),
    UserController.deleteUser
);




export default userRouter;