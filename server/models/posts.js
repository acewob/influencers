const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const postSchema=new Schema({
    name:String,
    title:String,
    company:String,
    influencer:String,
    dateposted:String,
});

module.exports=mongoose.model('Post',postSchema);