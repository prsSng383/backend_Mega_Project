import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
//This plugin enhances the functionality of Mongoose by adding pagination support for aggregate queries. Pagination is a common technique used in web development to split large sets of data into smaller, more manageable chunks.
// Mongoose: First, let's talk about Mongoose. It's a library for MongoDB and Node.js that makes working with MongoDB databases easier. It allows you to define schemas for your data and provides a way to interact with the database using JavaScript.
// Aggregation: Aggregation in MongoDB is a way to process data records and return computed results. You can perform various operations like grouping, filtering, sorting, and more on your data.
// Pagination: Pagination is a technique used to divide a large set of data into smaller, manageable parts called pages. Instead of showing all the data at once, you display a portion of it, usually with navigation controls to move between pages.


const videoSchema = new Schema({
   
    // storing videos in cloudinary and accessing here
    videoFile:{
        type: String ,// cloudinary url
        required: true
    },
    thumbnail:{
        type:String, // cloudinary url
        required: true
    },
    title:{
        type:String, 
        required: true
    },
    description:{
        type:String, 
        required: true
    },
    duration:{
        type:Number, //once the video is uploaded there cloudinary shares some info - like url, duration
        required: true
    },
    views:{
        type: Number,
        default:0
    },
    isPublished:{
        type: Boolean,
        default: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps: true})


videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video',videoSchema)