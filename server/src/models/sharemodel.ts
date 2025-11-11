import mongoose, { Schema, Document, Types } from "mongoose";

export interface IShare extends Document {
  itemId: Types.ObjectId;
  itemType: "brain" | "link" | "note";
  shareToken: string;
  sharedBy: Types.ObjectId;
  sharedWith?: string[];
  expiresAt?: Date;
  isRevoked: boolean;
  createdAt: Date;
}

const ShareSchema: Schema<IShare> = new Schema(
  {
    itemId: { type: Schema.Types.ObjectId, required: true },
    itemType: { type: String, enum: ["brain", "link", "note"], required: true },
    shareToken: { type: String, required: true, unique: true },
    sharedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sharedWith: [{ type: String }], // could be emails or user IDs
    expiresAt: Date,
    isRevoked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Share = mongoose.model<IShare>("Share", ShareSchema);
export default Share;