//连接db
const db=require("../db.js")
const testsadminSchema=db.Schema({
    goodsname:{type:String},
    price:{type:String},
})
const testModel=db.model("trests",testsadminSchema)
module.exports=testModel