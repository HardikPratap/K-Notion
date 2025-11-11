import { Router } from "express";
import { createShareToken, accessSharedItem } from "../controllers/sharecontroller";
import { protect } from "../middleware/authmiddleware";

const router = Router();

router.post("/create", protect, createShareToken);
// public endpoint — no protect
router.get("/:token", accessSharedItem);

export default router;