const express=require('express')
const mongoose=require('mongoose')
var session = require('express-session')
const BasicRouter = require('./routes/baisc.routes')
const app=express()
const port=3051

app.use(session({
  secret: 'NSS_Product_Mangement',
  resave: true,
  saveUninitialized: true,
  
}))

app.use(express.static("public"))

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/",BasicRouter)



let url=`mongodb://127.0.0.1:27017/Product_Management`
mongoose.connect(url)
      .then(()=>{
        console.log("db connected")
        app.listen(port,()=>{
             console.log(`server is connected on port number ${port}`)
        })
      })
      .catch(()=>{
        process.exit(1)

      })
