const express=require('express')
const res = require('express/lib/response')
const mongoose=require('mongoose')
const Standard=mongoose.model("Class")

var router=express.Router()

router.get('/',(req,res)=>{

    res.render('class/classAdd',{
        
        viewTitle: "Insert Class"
    })
    
})

router.post('/',(req,res)=>{
    console.log("update post",req.body._id)
    if(req.body._id=='')
    insertRecord(req,res)
    else
    updateRecord(req,res)
})

function  updateRecord(req,res){
    console.log("Updatedkkkkkk",req.body)
    Standard.findByIdAndUpdate( mongoose.Types.ObjectId(req.body._id),req.body,{new:true},(err,doc)=>{
        if(!err){res.redirect('class/list')}
        else
        {
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body)
                res.render("class/classAdd",{
                    viewTitle:"Update class",
                    standardDivision:req.body
                
            })
        }else{
            console.log("Error during record update :" +err)
        }
        console.log(req.body,"222222")
        
    }
})
}


function insertRecord(req,res){
    var standardDivision=new Standard()
    standardDivision.standard=req.body.standard;
    standardDivision.division=req.body.division;
    standardDivision.save((err,doc)=>{
        console.log("Inserted",err)
        if(!err)
         res.redirect('class/list')
        else{
            if(err.name== 'ValidationError'){
                handleValidationError(err,req.body)
                res.render("class/classAdd",{
                    viewTitle:"Insert Class",
                    standardDivision:req.body
                })
            }
            else
            console.log("Error during record insertion : " +err)
        }
    })
}
router.get('/list', (req, res) => {
    Standard.find((err, docs) => {
        console.log(docs)
        if (!err) {
            console.log("test") 
            res.render("class/list", {
                 
                list: docs
              
            });  console.log("test33") 
        }
        else {
            console.log('Error in retrieving class list :' + err);
        } 
    });
});


function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'standard':
                body['standardError'] = err.errors[field].message;
                break;
                case 'division':
                    body['divisionError'] = err.errors[field].message;
                    break;

                default:
                break;
        }
    }

}
router.get('/:id',(req,res)=>{
    Standard.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render('class/classAdd',{
                viewTitle:"Update Class",
                class:doc
            })
        }
        console.log("update",doc)
    })

})
router.get('/delete/:id',(req,res)=>{
    console.log("Deleted 1")
    console.log(req.params.id)
    Standard.findByIdAndDelete({_id : mongoose.Types.ObjectId(req.params.id)},(err,doc)=>{
        console.log("Deleted")
        if(!err){
            res.redirect('/class/list')
        }
        else{console.log("Error in Student delete :" +err)}
    }
    )})
    
module.exports = router;