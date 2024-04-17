import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'


const connectDB = async() =>{
          try {

         const connectionImplemented  =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

            console.log("MONGODB connected: ",connectionImplemented.connection.host);

            
          } catch (error) {
            console.log("Conenction ERROR with DB: ", error)
            process.exit(1);
          }
} 



export  default connectDB