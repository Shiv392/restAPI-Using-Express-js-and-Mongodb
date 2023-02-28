const mongoose=require('mongoose');

const subscriberSchema= new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    subscribedtochannel:{
        type:String,
        required:true
    },
    subscribeddate:{
        type:Date,
        required:true,
        default:Date.now
    }
})
//interact directly with database using mongoose
module.exports=mongoose.model('Subscribers',subscriberSchema)