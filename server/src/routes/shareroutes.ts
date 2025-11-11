import { Router } from "express";
import { createShareToken, accessSharedItem, cancelShare, listUserShares } from "../controllers/sharecontroller";
import { protect } from "../middleware/authmiddleware";

const router = Router();

router.post("/create", protect, createShareToken);
// public endpoint — no protect
router.get("/:token", accessSharedItem);
router.delete("/:token", protect, cancelShare);
router.get("/", protect, listUserShares);

export default router;