import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asynchandler";
import Brain from "../models/brainmodel";
import Note from "../models/notemodel";
import Link from "../models/linkmodel";

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


export const getBrainById = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const brain = await Brain.findById(id).populate({ path: "links", options: { sort: { createdAt: -1 } } }).populate("notes").lean();
  if (!brain) return res.status(404).json({ success: false, message: "Brain not found" });
  // if private and not owner, block
  if (!brain.isPublic && brain.ownerId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  res.json({ success: true, data: brain });
});


export const addLinkToBrain = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params; // brain id
  const { linkId } = req.body;
  const brain = await Brain.findById(id);
  if (!brain) return res.status(404).json({ success: false, message: "Brain not found" });
  if (brain.ownerId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: "Forbidden" });
  brain.links.push(linkId);
  await brain.save();
  res.json({ success: true, data: brain });
});

export const togglePublic = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const brain = await Brain.findById(id);
  if (!brain) return res.status(404).json({ success: false, message: "Not found" });
  if (brain.ownerId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: "Forbidden" });
  brain.isPublic = !brain.isPublic;
  await brain.save();
  res.json({ success: true, data: brain });
});


export const deleteBrain = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const brain = await Brain.findById(id);
  if (!brain) return res.status(404).json({ success: false, message: "Not found" });
  if (brain.ownerId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: "Forbidden" });
  // remove links and notes belonging to this brain
  await Link.deleteMany({ brainId: brain._id });
  await Note.deleteMany({ brainId: brain._id });
  await brain.deleteOne();
  res.json({ success: true, message: "Deleted" });
});