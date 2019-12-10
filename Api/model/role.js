//连接db
const db=require("../db.js")
const roleSchema=db.Schema({
    title:{type:String},
    limitid:{type:Array},
})
const roleModel=db.model("roles",roleSchema,"roles")
module.exports=roleModel