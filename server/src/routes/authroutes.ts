import { Router } from "express";
import { getMe, login, register } from "../controllers/authcontroller";
import { protect } from "../middleware/authmiddleware";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;