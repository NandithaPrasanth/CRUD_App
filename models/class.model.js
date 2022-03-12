const mongoose=require('mongoose')

var classSchema=new mongoose.Schema({

    standard:{
        type:String,
        required:"This field is required"
    },
    division:{
        type:String,
        required:"This field is required"
    } 

})

mongoose.model("Class",classSchema)