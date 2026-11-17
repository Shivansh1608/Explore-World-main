import { Router } from "express";
import {
  getAllDestinations,
  getSingleDestination,
  createNewDestination,
  updateExistingDestination,
  removeDestination,
} from "./destination.controller.js";
import { verifyJWT } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllDestinations);
router.get("/:id", getSingleDestination);
router.post("/", verifyJWT, createNewDestination);
router.put("/:id", verifyJWT, updateExistingDestination);
router.delete("/:id", verifyJWT, removeDestination);

export default router;

