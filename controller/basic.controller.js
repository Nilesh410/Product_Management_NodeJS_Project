const UserModel = require("../model/user.model")

let Basicontroller={
    dashboard(request,response){
        response.render("dashboard")
    },
    registerPage(request,reponse){
        reponse.render("register")
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
           let result=await newUser.save()
           if(result)
           {
              response.send({status:true,message:"Record Save Successfully"})
           }
           else
           {
            response.send({status:false,message:"Record not store successfully"})
           }
        } catch (error) {
            response.send({status:false,message:"error",error})
        }
        
    }
}

module.exports=Basicontroller