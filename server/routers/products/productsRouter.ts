import {Router, Request, Response} from 'express';
import * as productController from "../../controllers/productController";
import {body} from "express-validator";
import {tokenVerifier} from "../../middlewares/tokenVerifier";
import {validateForm} from "../../middlewares/validateForm";

const productsRouter: Router = Router();


productsRouter.post("/", [
    body('title').not().isEmpty().withMessage("title is required"),
    body('description').not().isEmpty().withMessage("description is required"),
    body('imageUrl').not().isEmpty().withMessage("imageUrl is required"),
    body('brand').not().isEmpty().withMessage("brand is required"),
    body('price').not().isEmpty().withMessage("price is required"),
    body('quantity').not().isEmpty().withMessage("quantity is required"),
    body('categoryId').not().isEmpty().withMessage("categoryId is required"),
    body('subCategoryId').not().isEmpty().withMessage("subCategoryId is required")
], tokenVerifier, validateForm, async (request: Request, response: Response) => {
    await productController.createProduct(request, response);
});


productsRouter.put("/:productId", [
    body('title').not().isEmpty().withMessage("title is required"),
    body('description').not().isEmpty().withMessage("description is required"),
    body('imageUrl').not().isEmpty().withMessage("imageUrl is required"),
    body('brand').not().isEmpty().withMessage("brand is required"),
    body('price').not().isEmpty().withMessage("price is required"),
    body('quantity').not().isEmpty().withMessage("quantity is required"),
    body('categoryId').not().isEmpty().withMessage("categoryId is required"),
    body('subCategoryId').not().isEmpty().withMessage("subCategoryId is required")
], tokenVerifier, validateForm, async (request: Request, response: Response) => {
    await productController.updateProduct(request, response);
});


productsRouter.get("/", tokenVerifier, async (request: Request, response: Response) => {
    await productController.getAllProducts(request, response);
});


productsRouter.get("/:productId", tokenVerifier, async (request: Request, response: Response) => {
    await productController.getProduct(request, response);
});



productsRouter.delete("/:productId", tokenVerifier, async (request: Request, response: Response) => {
    await productController.deleteProduct(request, response);
});


productsRouter.get("/categories/:categoryId", tokenVerifier, async (request: Request, response: Response) => {
    await productController.getAllProductsWithCategoryId(request, response);
});

export default productsRouter;