import { Router } from "express";
import * as userCtrl from "../controllers/users.controller.js";
import { authJwt } from "../middlewares";
const router = Router();
router.post("/", [authJwt.verifyToken, authJwt.verifyAdmin], userCtrl.createUser);
router.get("/", userCtrl.getAllUsers);
router.delete("/:id", [authJwt.verifyToken, authJwt.verifyAdmin], userCtrl.deleteUser);

export default router;
