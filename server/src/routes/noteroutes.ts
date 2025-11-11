import { Router } from "express";
import { addNote, getNotesByBrain, updateNote, deleteNote } from "../controllers/notecontroller";
import { protect } from "../middleware/authmiddleware";

const router = Router();

router.post("/", protect, addNote);
router.get("/", protect, getNotesByBrain);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;