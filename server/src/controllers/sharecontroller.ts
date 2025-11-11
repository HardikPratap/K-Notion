import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asynchandler";
import { createShare, getShareByToken } from "../services/shareservice";
import Brain from "../models/brainmodel";
import Link from "../models/linkmodel";
import Note from "../models/notemodel";

export const createShareToken = asyncHandler(async (req: any, res: Response) => {
  const { itemType, itemId, expiresAt } = req.body;
  // basic permission checks can be added here
  const share = await createShare(itemType, itemId, expiresAt ? new Date(expiresAt) : undefined);
  res.json({ success: true, data: { shareUrl: `/share/${share.shareToken}`, token: share.shareToken } });
});

export const accessSharedItem = asyncHandler(async (req: any, res: Response) => {
  const { token } = req.params;
  const share = await getShareByToken(token);
  if (!share) return res.status(404).json({ success: false, message: "Share not found or expired" });

  let item = null;
  if (share.itemType === "brain") item = await Brain.findById(share.itemId).populate("links notes").lean();
  if (share.itemType === "link") item = await Link.findById(share.itemId).lean();
  if (share.itemType === "note") item = await Note.findById(share.itemId).lean();

  if (!item) return res.status(404).json({ success: false, message: "Item not found" });
  res.json({ success: true, data: item });
});