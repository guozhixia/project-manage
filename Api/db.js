const db = require("mongoose")
//连接数据库
db.connect("mongodb://127.0.0.1:27017/background",{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    console.log("success")
})
module.exports=db