import {Router, Request, Response} from 'express';
import {body} from "express-validator";
import {tokenVerifier} from "../../middlewares/tokenVerifier";
import {validateForm} from "../../middlewares/validateForm";
import * as orderController from "../../controllers/orderController";

const ordersRouter: Router = Router();


ordersRouter.post("/place", [
    body('products').not().isEmpty().withMessage("products is required"),
    body('total').not().isEmpty().withMessage("total is required"),
    body('tax').not().isEmpty().withMessage("tax is required"),
    body('grandTotal').not().isEmpty().withMessage("grandTotal is required"),
    body('paymentType').not().isEmpty().withMessage("paymentType is required"),
], tokenVerifier, validateForm, async (request: Request, response: Response) => {
    await orderController.placeOrder(request, response);
});


ordersRouter.get("/all", tokenVerifier, async (request: Request, response: Response) => {
    await orderController.getAllOrders(request, response);
});


ordersRouter.get("/me", tokenVerifier, async (request: Request, response: Response) => {
    await orderController.getMyOrders(request, response);
});


ordersRouter.post("/:orderId", [
    body('orderStatus').not().isEmpty().withMessage("orderStatus is required"),
], tokenVerifier, validateForm, async (request: Request, response: Response) => {
    await orderController.updateOrderStatus(request, response);
});

export default ordersRouter;