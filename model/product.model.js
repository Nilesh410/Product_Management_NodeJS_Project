const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
    productname:{type:String},
    qty: {type:Number},
    price: {type:Number},
    manufacturing_date: {type:String},
})

const ProductModel=mongoose.model("product",ProductSchema,"productData")
module.exports=ProductModel