//连接db
const db=require("../db.js")
const limitSchema=db.Schema({
    title:{type:String},
    name:{type:String},
    pid:{type:String},
})
const limitModel=db.model("limit",limitSchema)
module.exports=limitModel