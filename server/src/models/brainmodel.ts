import mongoose,{Schema, Types,Document} from "mongoose";

export interface IBrain extends Document {
    title:String,
    description:String,
    ownerId:Types.ObjectId,
    links:Types.ObjectId[],
    notes: Types.ObjectId[];
    isPublic: boolean;
    sharedWith?: Types.ObjectId[];
    tags?: string[];
    coverImage?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BrainSchema: Schema<IBrain> = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    links: [{ type: Schema.Types.ObjectId, ref: "Link" }],
    notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
    isPublic: { type: Boolean, default: false },
    sharedWith: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tags: [String],
    coverImage: String
  },
  { timestamps: true }
);


const Brain = mongoose.model<IBrain>("Brain", BrainSchema);
export default Brain;