import { Router } from "express";
import * as productsController from "../controllers/products.controllers";
import { authJwt } from "../middlewares";
const router = Router();
router.get("/", productsController.getProducts);
router.post("/", [authJwt.verifyToken, authJwt.verifyModerator], productsController.createProduct);
router.get("/:productId", productsController.getProductById);
router.put(
	"/:productId",
	[authJwt.verifyToken, authJwt.verifyAdmin],
	productsController.updateProductById
);
router.delete(
	"/:productId",
	[authJwt.verifyToken, authJwt.verifyAdmin],
	productsController.deleteProductById
);

export default router;
