const Basicontroller = require('../controller/basic.controller')
const multer  = require('multer')
const upload = multer()

const BasicRouter=require('express').Router()

BasicRouter.get("/",Basicontroller.dashboard)
BasicRouter.get("/register-page",Basicontroller.registerPage)
BasicRouter.get("/login-page",Basicontroller.loginPage)
BasicRouter.post("/save-user",Basicontroller.saveUser)
BasicRouter.get("/remove-all",Basicontroller.removeAll)
BasicRouter.post("/user-login",Basicontroller.userLogin)
BasicRouter.get("/logout",Basicontroller.logout)
BasicRouter.post("/save-new-product",upload.none(),Basicontroller.saveProduct)
BasicRouter.get("/get-product",Basicontroller.getProduct)
BasicRouter.delete("/del-product/:id",Basicontroller.delProduct)

module.exports=BasicRouter