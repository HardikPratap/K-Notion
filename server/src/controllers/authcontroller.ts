import { Request,Response } from "express";
import User from "../models/usermodel";
import { signToken } from "../utils/generateToken";
import { asyncHandler } from "../middleware/asynchandler";

export async function register(req:Request,res: Response){
    const { name, email, password } = req.body;
    if(!name || !email || !password) 
        return res.status(400).json({
        success: false, message: "Missing fields"
    })

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: "User already exists" });

    const user = new User({ name, email, password });
    await user.save();

    const token = signToken({ id: user._id });

    res.status(201).json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email }, token } });
}
export async function login(req:Request,res: Response){
    const {  email, password } = req.body;
    if( !email || !password) 
        return res.status(400).json({
        success: false, message: "Missing fields"
    })

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "No user with this Email" });

     const matched = await user.matchPassword(password);
  if (!matched) return res.status(401).json({ success: false, message: "Wrong Password" });

    const token = signToken({ id: user._id });
  res.json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email }, token } });
}

export const getMe = asyncHandler(async (req: any, res: Response) => {
  const user = req.user;
  res.json({ success: true, data: user });
});