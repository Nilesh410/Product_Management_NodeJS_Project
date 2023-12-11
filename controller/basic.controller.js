const UserModel = require("../model/user.model")

let Basicontroller={
    dashboard(request,response){
        response.render("dashboard")
    },
    registerPage(request,reponse){
        let message=request.session.message!== undefined ? request.session.message : ""
        delete request.session.message;
        reponse.render("register",
                       {message:message,
                        newUser:{...request.session.newUser}})
    },

    loginPage(request,response){
        response.render("login")
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
    }
}

module.exports=Basicontroller