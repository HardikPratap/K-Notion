import mongoose from 'mongoose'
import { ENV } from './env';
import { logger } from '../utils/logger';


export const dbConnect = async()=>{
    try{
        await mongoose.connect(ENV.MONGO_URI);
        logger.info("DB Connection successfull")
    }catch(e){
        console.log("DB Connection Failure", e)
    }
    
}