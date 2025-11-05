import mongoose, { Schema, Document, Types } from "mongoose";

export interface INote extends Document {
  title?: string;
  content: string;
  tags?: string[];
  brainId: Types.ObjectId;
  ownerId: Types.ObjectId;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema:Schema<INote> = new Schema({
    title : {type:String, required:true},
    content : {type:String, required:true},
    tags : [String],
    brainId: {type:Schema.Types.ObjectId, ref:"Brain",required:true},
    ownerId: {type:Schema.Types.ObjectId, ref:"Owner",required : true},
    isPublic: {type:Boolean, default: false},
},{
    timestamps:true
})

const Note= mongoose.model<INote>("Note",noteSchema)

export default Note;