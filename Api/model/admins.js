//连接db
const db=require("../db.js")
const adminSchema=db.Schema({
    name:{type:String},
    password:{type:String},
    roleid:{type:String,ref:"roles"}
})
const adminModel=db.model("admins",adminSchema)
module.exports=adminModel