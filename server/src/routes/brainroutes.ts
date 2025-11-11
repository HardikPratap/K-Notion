import { Router } from "express";
import {
  createBrain,
  getMyBrains,
  getBrainById,
  addLinkToBrain,
  togglePublic,
  deleteBrain
} from "../controllers/braincontroller";
import { protect } from "../middleware/authmiddleware";

const router = Router();

router.post("/", protect, createBrain);
router.get("/mine", protect, getMyBrains);
router.get("/:id", protect, getBrainById);
router.post("/:id/add-link", protect, addLinkToBrain);
router.patch("/:id/toggle-public", protect, togglePublic);
router.delete("/:id", protect, deleteBrain);

export default router;