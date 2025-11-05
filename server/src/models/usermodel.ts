import mongoose,{Schema} from "mongoose";
import { comparePasswords, hashPasword } from "../utils/hashPassword";

export interface Iuser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(plain:String): Promise<Boolean>;
}

const userSchema:Schema<Iuser> =new Schema({
  "name": {type: String, required: true},
  "email": {type: String, required: true,unique:true,lowercase: true},
  "password": {type: String, required: true},
  "avatar": {type: String},
},{
  timestamps:true
});

//storing a prehashed password in db
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();

  this.password=await hashPasword(this.password)
  next()
})

//function to get access for matchPasswords directly
userSchema.methods.matchPassword= async function(plain:string){
  return comparePasswords(plain, this.password)
}

const User= mongoose.model<Iuser>("User",userSchema)
export default  User;