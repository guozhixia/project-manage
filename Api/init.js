//初始化后台文件
//如果没有后台管理员数据的话 就创建默账号
//查看是否存在该用户名和密码，如果不存在就创建

const adminModel=require("./model/admins.js")
//查找
adminModel.find({},(err,data)=>{
    //如果没有就创建
    if(data.length==0){
        adminModel.create({
           "name":"guozhixia",
           "password":"123",
           "roleid":""
        },(err,data)=>{
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })
    }
})
