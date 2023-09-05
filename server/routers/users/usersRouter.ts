import {Router, Request, Response, raw} from 'express';
import {tokenVerifier} from "../../middlewares/tokenVerifier";
import {validateForm} from "../../middlewares/validateForm";
import * as userController from "../../controllers/userController";
import {body} from "express-validator";

const usersRouter: Router = Router();


usersRouter.post("/register", [
    body('username').not().isEmpty().withMessage("Username is required"),
    body('email').isEmail().withMessage("valid email is required"),
    body('password').isStrongPassword().withMessage("Strong password is required"),
], validateForm, async (request: Request, response: Response) => {
    await userController.registerUser(request, response);
});



usersRouter.post("/login", [
    body('email').isEmail().withMessage("valid email is required"),
    body('password').isStrongPassword().withMessage("Strong password is required"),
], validateForm, async (request: Request, response: Response) => {
    await userController.loginUser(request, response);
});



usersRouter.get("/me", tokenVerifier, async (request: Request, response: Response) => {
    await userController.getUsersData(request, response);
});


usersRouter.post("/profile", [
    body('imageUrl').not().isEmpty().withMessage("imageUrl is required"),
], tokenVerifier, validateForm, async (request: Request, response: Response) => {
    await userController.updateProfilePicture(request, response);
});


usersRouter.post("/change-password", [
    body('password').isStrongPassword().withMessage("Strong Password is required"),
], tokenVerifier, validateForm, async (request: Request, response: Response) => {
    await userController.changePassword(request, response);
});


export default usersRouter;