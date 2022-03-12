const mongoose=require('mongoose')

var studenSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:"This field is required"
    },
    rollNo:{
        type:Number,
        required:"This field is required"

    },
    mobileNo:{
        type:Number,
        required:"This field is required"
    },
    classId:{
        type:String,
        required:"This field is required"
    }
})

mongoose.model("Students",studenSchema)