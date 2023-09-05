import {Router, Request, Response} from 'express';
import {body} from "express-validator";
import {tokenVerifier} from "../../middlewares/tokenVerifier";
import {validateForm} from "../../middlewares/validateForm";
import * as categoryController from "../../controllers/categoryController";

const categoriesRouter: Router = Router();


categoriesRouter.post("/", [
    body('name').not().isEmpty().withMessage("Name is required"),
    body('description').not().isEmpty().withMessage("Description is required"),
], tokenVerifier, validateForm, async (request: Request, response: Response) => {
    await categoryController.createCategory(request, response);
});


categoriesRouter.post("/:categoryId", [
    body('name').not().isEmpty().withMessage("Name is required"),
    body('description').not().isEmpty().withMessage("Description is required"),
], tokenVerifier, validateForm, async (request: Request, response: Response) => {
    await categoryController.createSubCategory(request, response);
});


categoriesRouter.get("/", async (request: Request, response: Response) => {
    await categoryController.getAllCategories(request, response);
});

export default categoriesRouter;