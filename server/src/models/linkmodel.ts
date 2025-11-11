import mongoose, { Schema, Types } from "mongoose";
import { Platform } from "../utils/constant";

export interface ILink{
    title?: string;
  url: string;
  previewImage?: string;
  description?: string;
  tags?: string[];
  type: Platform;
  metadata?: Record<string, any>;
  brainId: Types.ObjectId;
  ownerId: Types.ObjectId;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const linkSchema: Schema<ILink>= new Schema({
    title:{type:String, required:true},
    url:{type:String, required:true},
    previewImage:{type:String},
    description:{type:String},
    tags:[String],
    type:{ type: String, enum: ["youtube", "twitter", "facebook", "website", "custom"], default: "website" },
    metadata: Schema.Types.Mixed,
    brainId: { type: Schema.Types.ObjectId, ref: "Brain", required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPublic: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Link= mongoose.model<ILink>("Link",linkSchema)

export default Link;