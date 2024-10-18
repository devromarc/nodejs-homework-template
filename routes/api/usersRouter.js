import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserSubscription,
} from "../../controller/userController.js";

import { authenticateToken } from "../../middleware/auth.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", authenticateToken, logoutUser);
router.get("/current", authenticateToken, getCurrentUser);
router.patch("/", authenticateToken, updateUserSubscription);

export { router };
