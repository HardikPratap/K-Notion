import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asynchandler";
import { fetchPreview } from "../services/linkPreviewservice";
import { summarizeText } from "../services/aiservice";
import Link from "../models/linkmodel";
import Brain from "../models/brainmodel";


export const addLink = asyncHandler(async (req: any, res: Response) => {
  const { url, title, tags, isPublic } = req.body;
  const brainId = req.body.brainId;
  if (!url || !brainId) return res.status(400).json({ success: false, message: "Missing url or brainId" });

  // fetch preview metadata
  const preview = await fetchPreview(url);
  const chosenTitle = title || preview.title || url;
  const summaryObj = await summarizeText(preview.description || chosenTitle);

  const link = new Link({
    title: chosenTitle,
    url,
    previewImage: preview.image || undefined,
    description: preview.description || undefined,
    tags,
    type: "website",
    metadata: preview,
    brainId,
    ownerId: req.user._id,
    isPublic: !!isPublic,
    // optionally save summary under metadata
  });

  await link.save();
  // attach to brain
  await Brain.findByIdAndUpdate(brainId, { $push: { links: link._id } });

  res.status(201).json({ success: true, data: link, summary: summaryObj.summary });
});

export const getLinksByBrain = asyncHandler(async (req: any, res: Response) => {
  const { brainId } = req.query;
  if (!brainId) return res.status(400).json({ success: false, message: "brainId required" });
  const links = await Link.find({ brainId }).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: links });
});

export const getLinkById = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const link = await Link.findById(id).lean();
  if (!link) return res.status(404).json({ success: false, message: "Link not found" });
  // privacy check: if not public, ensure owner or brain owner
  res.json({ success: true, data: link });
});

export const updateLink = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const link = await Link.findById(id);
  if (!link) return res.status(404).json({ success: false, message: "Link not found" });
  if (link.ownerId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: "Forbidden" });
  Object.assign(link, payload);
  await link.save();
  res.json({ success: true, data: link });
});

export const deleteLink = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const link = await Link.findById(id);
  if (!link) return res.status(404).json({ success: false, message: "Link not found" });
  if (link.ownerId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: "Forbidden" });
  await link.deleteOne();
  // remove from brain array
  await Brain.findByIdAndUpdate(link.brainId, { $pull: { links: link._id } });
  res.json({ success: true, message: "Deleted" });
});