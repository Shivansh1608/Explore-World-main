import { Router } from "express";
import {
  register,
  login,
  logout,
  refresh,
  getMe,
} from "./auth.controller.js";
import { registerSchema, loginSchema, validateRequest } from "./auth.validation.js";
import { verifyJWT } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/me", verifyJWT, getMe);

export default router;
