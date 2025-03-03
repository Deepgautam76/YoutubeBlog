const { Schema, model } = require("mongoose");

//This is schema for blog-Form
const blogSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String,
        required:false,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
},{timestamps:true});

const Blog=model("blog",blogSchema);

module.exports=Blog;