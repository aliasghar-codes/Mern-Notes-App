import express from "express"
import { userSignUp, userLogin, getUser, logOut } from "../controllers/user.controller.js"
import { authenticateToken } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/register", userSignUp);
router.post("/login", userLogin);
router.get("/get", authenticateToken, getUser);
router.get("/logout", authenticateToken, logOut);

export default router;