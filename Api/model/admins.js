//连接db
const db=require("../db.js")
const adminSchema=db.Schema({name:{type:String},password:{type:String}})
const adminModel=db.model("admins",adminSchema)
module.exports=adminModel