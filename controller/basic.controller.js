const UserModel = require("../model/user.model")

let Basicontroller={
    dashboard(request,response){
        if(request.session.login===undefined)  
        {
            response.redirect("/login-page")
            return false
        }
        response.render("dashboard1")
    },
    registerPage(request,response){
        //check the user is in the login mode or not first 
        // if it is in the sesssion then does not go the register page or login page, goes to dashboard
        if(request.session.login!==undefined)  
        {
            response.redirect("/")
            return false
        }
        let message=request.session.message!== undefined ? request.session.message : ""
        delete request.session.message;
        response.render("register",
                       {message:message,
                        newUser:{...request.session.newUser}})
    },

    loginPage(request,response){
        if(request.session.login!==undefined)
        {
            response.redirect("/")
            return false
        }
        let message=request.session.message!== undefined ? request.session.message : ""
        delete request.session.message;
        response.render("login",{message:message})
    }, 

    async saveUser(request,response){
        let data=request.body
        try {
           let newUser=UserModel({
            fullname:data.fullName,
            emailid:data.emailId,
            mobileno:data.mobileNo,
            username:data.userName,
            password:data.passWord,
            confirmpassword:data.confirmPassWord
           })
           let userExists=await UserModel.findOne({emailid:{$regex:"^"+data.emailId+"$",$options:"i"}})
           if(userExists)
           {
              request.session.message = "EmailId is already exists in the database";
              request.session.newUser={...data}
           }
           else
           {
            let result=await newUser.save()
            if(result)
            {
               request.session.message = "Record Save Successfully";
               request.session.newUser={}
            }
            else
            {
             request.session.message = "Record not store successfully";
             request.session.newUser={...data}
            }
           }
           
           response.redirect("/register-page")
        } catch (error) {
            request.session.message = "Error is coming during registration";
            request.session.newUser={...data}
            response.redirect("/register-page");
        }
       
    },

    async removeAll(request,response){
        let result=await UserModel.deleteMany({})
        response.json({status:true,message:result})
    },

    async userLogin(request,response){
         let data=request.body
         try {
            let userexist=await UserModel.findOne({
                username:{$regex:`^${data.userName}$`,$options:"i"},
                password:data.passWord
            },{password:0})
            if(userexist)
            {
                request.session.login={ userexist };
                response.redirect("/")
            }
            else
            {
                request.session.message = "Username or password is wrong pleae try agian";
                response.redirect("/login-page")
            }
            
         } catch (error) {
            request.session.message = "Unable to login";
            response.redirect("/login-page")
         }
    }
}

module.exports=Basicontroller