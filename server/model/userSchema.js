const mongoose=require('mongoose')

const schema=mongoose.Schema;

const userSChema=new schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
       
    },
    isBlock:{
        type:Boolean,
    },
    socketId:{
        type:String    
    }

})

module.exports=mongoose.model('users',userSChema)