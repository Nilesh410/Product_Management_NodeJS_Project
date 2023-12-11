const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
      fullname:{type:String},
      emailid:{type:String},
      mobileno:{type:String},
      username:{type:String},
      password:{type:String},
      confirmpassword:{type:String}
})

const UserModel=mongoose.model("user",UserSchema,"userData")
module.exports=UserModel
