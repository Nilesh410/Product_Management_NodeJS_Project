const Basicontroller = require('../controller/basic.controller')

const BasicRouter=require('express').Router()

BasicRouter.get("/",Basicontroller.dashboard)
BasicRouter.get("/register-page",Basicontroller.registerPage)
BasicRouter.get("/login-page",Basicontroller.loginPage)
BasicRouter.post("/save-user",Basicontroller.saveUser)
BasicRouter.get("/remove-all",Basicontroller.removeAll)
BasicRouter.post("/user-login",Basicontroller.userLogin)

module.exports=BasicRouter