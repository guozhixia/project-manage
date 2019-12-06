//初始化后台文件
//如果没有后台管理员数据的话 就创建默账号
//查看是否存在该用户名和密码，如果不存在就创建

//引入db文件
const db=require("./db.js")
//创建管理员的骨架
const adminSchema=db.Schema({
    name:{type:String},
    password:{type:String}
})
//生成模型
const adminModel=db.model("admins",adminSchema)//admins这是mongodb里的库名
//查找
adminModel.find({},(err,data)=>{
    //如果没有就创建
    if(data.length==0){
        adminModel.create({
           "name":"guozhixia",
           "password":"123"
        },(err,data)=>{
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })
    }
})
