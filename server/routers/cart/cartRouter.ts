import {Router, Request, Response} from 'express';
import {body} from "express-validator";
import {tokenVerifier} from "../../middlewares/tokenVerifier";
import {validateForm} from "../../middlewares/validateForm";
import * as cartController from "../../controllers/cartController";

const cartRouter: Router = Router();


cartRouter.post("/", [
    body('products').not().isEmpty().withMessage("products is required"),
    body('total').not().isEmpty().withMessage("total is required"),
    body('tax').not().isEmpty().withMessage("tax is required"),
    body('grandTotal').not().isEmpty().withMessage("grandTotal is required"),
], tokenVerifier, validateForm, async (request: Request, response: Response) => {
    await cartController.createCart(request, response);
});


cartRouter.get("/me", tokenVerifier, async (request: Request, response: Response) => {
    await cartController.getCartInfo(request, response);
});

export default cartRouter;