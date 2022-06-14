import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authJwt, verifySignUp } from "../middlewares";
const router = Router();
router.post(
	"/signUp",
	[verifySignUp.verfiyEmailOrName, verifySignUp.chekRolesExist],
	authController.singUp
);
router.post("/signIn", authController.singIn);

export default router;
