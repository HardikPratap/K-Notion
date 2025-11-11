import { Request,Response } from "express";
import User from "../models/usermodel";
import { signToken } from "../utils/generateToken";

export async function Register(req:Request,res: Response){
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
