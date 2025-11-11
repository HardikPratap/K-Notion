import { Router } from "express";
import { addLink, getLinksByBrain, getLinkById, updateLink, deleteLink } from "../controllers/linkcontroller";
import { protect } from "../middleware/authmiddleware";

const router = Router();

router.post("/", protect, addLink);
router.get("/", protect, getLinksByBrain);
router.get("/:id", protect, getLinkById);
router.put("/:id", protect, updateLink);
router.delete("/:id", protect, deleteLink);

export default router;