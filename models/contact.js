const mongoose=require('mongoose');

//----Defining schema structure (document/Schema)
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

//---- Collection
const Contact=mongoose.model('contact',contactSchema);

module.exports=Contact;