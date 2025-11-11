import { v4 as uuidv4 } from "uuid";
import Share from "../models/shar";

export async function createShare(itemType: "brain" | "link" | "note", itemId: string, expiresAt?: Date) {
  const token = uuidv4();
  const share = new Share({
    itemType,
    itemId,
    shareToken: token,
    expiresAt
  });
  await share.save();
  return share;
}

export async function getShareByToken(token: string) {
  const share = await Share.findOne({ shareToken: token, isRevoked: false }).lean();
  if (!share) return null;
  if (share.expiresAt && new Date() > share.expiresAt) return null;
  return share;
}