//连接db
const db=require("./db.js")
const express=require("express")
const app=express()
const cors=require("cors")
const bodyParser=require("body-parser")
const jwt=require("jsonwebtoken")

app.use(cors())
app.use(bodyParser.json())
app.listen("3000",function(){
    console.log("welcome 3000")
})
//写接口
//第一个接口--验证用户名是否正确
const adminSchema=db.Schema({name:{type:String},password:{type:String}})
const adminModel=db.model("admins",adminSchema)
app.use(bodyParser.urlencoded({extended:true}))
    app.post("/login",(req,res)=>{
        let {name,password}=req.body
            //  连接数据库并且查找是否存在
        adminModel.findOne({"name":name,"password":password},(err,data)=>{
            if(data){
                let content ={name:data._id}; // 要生成token的主题信息
                let secretOrPrivateKey="guo" // 这是加密的key（密钥） 
                let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60*60*1  // 1小时过期
            });
                res.send({"err_code":200,"id":data._id})
            }else{
                es.send({"err_code":400})
            }
            })
         })
//第二个接口--验证token
app.get('/checktoken', (req, res) => {
    let token = req.headers.token; // 从header中获取token
    let secretOrPrivateKey = "guo"; // 这是加密的key（密钥） 

    jwt.verify(token, secretOrPrivateKey, function (err) {
        if (err) {  //  时间失效的时候/ 伪造的token          
            res.send({ 'err_code': 400 });
        } else {
            res.send({ 'err_code': 200 });
        }
    })
})