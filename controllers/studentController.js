const express=require('express')
const res = require('express/lib/response')
const mongoose=require('mongoose')
const Student=mongoose.model("Students")

var router=express.Router()

router.get('/',(req,res)=>{
    console.log("test1")
    res.render('student/addOrEdit',{
        
        viewTitle: "Insert Student"
    })
    console.log("test2")
})

router.post('/',(req,res)=>{
    if(req.body._id=='')
    insertRecord(req,res)
    else
    updateRecord(req,res)
})

function  updateRecord(req,res){
    Student.findByIdAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){res.redirect('student/list')}
        else
        {
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body)
                res.render("student/addOrEdit",{
                    viewTitle:"Update student",
                    student:req.body
            })
        }else{
            console.log("Error during record update :" +err)
        }
    }
})
}


function insertRecord(req,res){
    var student=new Student()
    student.fullName=req.body.fullName;
    student.mobileNo=req.body.mobileNo;
    student.rollNo=req.body.rollNo;
    student.classId=req.body.classId;
    student.save((err,doc)=>{
        if(!err)
        res.redirect('student/list')
        else{
            if(err.name== 'ValidationError'){
                handleValidationError(err,req.body)
                res.render("student/addOrEdit",{
                    viewTitle:"Insert student",
                    student:req.body
                })
            }
            else
            console.log("Error during record insertion : " +err)
        }
    })

}
router.get('/list',(req,res)=>{
console.log("test 3")
    // res.json('from list')
    Student.find((err,docs)=>{
        if(!err){
            console.log("test 4")
            res.render('student/list',{
                
                list:docs
            })
            console.log(docs,"test 5")
        }else{
            console.log("Error in retrieving employee list :"+err)
        }
    })
})

function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
                case 'mobileNo':
                    body['mobileNoError'] = err.errors[field].message;
                    break;

                default:
                break;
        }
    }

}
router.get('/:id',(req,res)=>{
    Student.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render('student/addOrEdit',{
                viewTitle:"Update Student",
                student:doc
            })
        }
    })

})
router.get('/delete/:id',(req,res)=>{
    console.log("Deleted 1")
    console.log(req.params.id)
    Student.findByIdAndDelete({_id : mongoose.Types.ObjectId(req.params.id)},(err,doc)=>{
        console.log("Deleted")
        if(!err){
            res.redirect('/student/list')
        }
        else{console.log("Error in Student delete :" +err)}
    }
    )})
module.exports=router;