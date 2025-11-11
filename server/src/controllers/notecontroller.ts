import { Request, Response } from "express";
import Note from "../models/notemodel";
import Brain from "../models/brainmodel";
import { asyncHandler } from "../middleware/asynchandler";


export const addNote = asyncHandler(async (req: any, res: Response) => {
  const { title, content, tags, brainId, isPublic } = req.body;
  if (!content || !brainId) return res.status(400).json({ success: false, message: "Missing content or brainId" });

  const note = new Note({
    title,
    content,
    tags,
    brainId,
    ownerId: req.user._id,
    isPublic: !!isPublic
  });
  await note.save();
  await Brain.findByIdAndUpdate(brainId, { $push: { notes: note._id } });
  res.status(201).json({ success: true, data: note });
});

export const getNotesByBrain = asyncHandler(async (req: any, res: Response) => {
  const { brainId } = req.query;
  if (!brainId) return res.status(400).json({ success: false, message: "brainId required" });
  const notes = await Note.find({ brainId }).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: notes });
});

export const updateNote = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const note = await Note.findById(id);
  if (!note) return res.status(404).json({ success: false, message: "Note not found" });
  if (note.ownerId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: "Forbidden" });
  Object.assign(note, payload);
  await note.save();
  res.json({ success: true, data: note });
});

export const deleteNote = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) return res.status(404).json({ success: false, message: "Note not found" });
  if (note.ownerId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: "Forbidden" });
  await note.deleteOne();
  await Brain.findByIdAndUpdate(note.brainId, { $pull: { notes: note._id } });
  res.json({ success: true, message: "Deleted" });
});