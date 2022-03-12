const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/studentdb',{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log( "Connection success")
    }
    else{console.log("Error in DB :"+err)}
})

require('./students.model')
require('./class.model')
