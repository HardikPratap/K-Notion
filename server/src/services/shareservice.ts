import { v4 as uuidv4 } from "uuid";
import Share from "../models/sharemodel";


export async function createShare(itemType: "brain" | "link" | "note", itemId: string, expiresAt?: Date, sharedBy?: string) {
  const token = uuidv4();
  const share = new Share({
    itemType,
    itemId,
    shareToken: token,
    expiresAt,
    sharedBy
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


/**
 * Revoke an active share link (cancel previous share)
 */
export async function revokeShare(token: string, userId: string) {
  const share = await Share.findOne({ shareToken: token, sharedBy: userId });
  if (!share) return null;

  share.isRevoked = true;
  await share.save();
  return share;
}

/**
 * Get all shares created by a user
 */
export async function getUserShares(userId: string) {
  const shares = await Share.find({ sharedBy: userId })
    .select("itemType itemId shareToken isRevoked createdAt expiresAt sharedWith")
    .lean();
  return shares;
}