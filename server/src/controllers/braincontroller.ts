import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asynchandler";
import Brain from "../models/brainmodel";

export const createBrain = asyncHandler(async (req: any, res: Response) => {
  const { title, description, isPublic, tags } = req.body;
  const ownerId = req.user._id;
  const brain = new Brain({ title, description, ownerId, isPublic: !!isPublic, tags });
  await brain.save();
  res.status(201).json({ success: true, data: brain });
});

export const getMyBrains = asyncHandler(async (req: any, res: Response) => {
  const ownerId = req.user._id;
  const brains = await Brain.find({ ownerId }).populate("links notes").lean();
  res.json({ success: true, data: brains });
});