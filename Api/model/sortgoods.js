//连接db
const db=require("../db.js")
const goodsSchema=db.Schema({
    title:{type:String},
    imgurl:{type:String},
    pid:{type:String},
})
const goodsModel=db.model("goods",goodsSchema,)
module.exports=goodsModel