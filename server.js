require('./models/db')
const express=require('express')
const path=require('path')
const exphbs=require('express-handlebars')
const studentController=require('./controllers/studentController')
const classController=require('./controllers/classController')
const bodyparser=require('body-parser')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

var app=express()

app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(bodyparser.json())

app.set('views',path.join(__dirname,'/views/'))
app.engine('hbs',exphbs.engine({extname:"hbs",defaultLayout:'mainLayout', handlebars: allowInsecurePrototypeAccess(Handlebars),layoutsDir:__dirname +'/views/layouts/'}))
app.set('view engine','hbs')

app.listen(3000,()=>{
    console.log("Express server is started at port : 3000")
})

app.use('/student',studentController)
app.use('/class',classController)