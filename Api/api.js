
const express=require("express")
const app=express()
const cors=require("cors")
const bodyParser=require("body-parser")
const jwt=require("jsonwebtoken")
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//载入admins
const adminModel=require("./model/admins.js")
//写接口

//第一个接口--验证用户名是否正确
    app.post("/login",(req,res)=>{
        let {name,password}=req.body
        // console.log(name,password)
            //  连接数据库并且查找是否存在
        adminModel.findOne({"name":name,"password":password},(err,data)=>{
            if(data){
                let content ={name:data._id}; // 要生成token的主题信息
                let secretOrPrivateKey="guo" // 这是加密的key（密钥） 
                let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60*60*36 // 1小时过期
            });
                res.send({"err_code":200,"id":data._id,token:token})
            }else{
                res.send({"err_code":400})
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

//第三个接口--添加权限
const limitModel=require("./model/limit.js")
app.post("/addlimit",(req,res)=>{
    //接受参数
    let {title,name,pid}=req.body
    //插入数据库
    let obj={"name":name,"title":title,"pid":pid}
    limitModel.create(obj,(err,data)=>{
        if(err){
            res.send({'err_code':400})
        }else{
            res.send({'err_code':200})
        }
    })
})

//第四个接口---查询接口--获取所有的接口
app.get("/getlimit",(req,res)=>{
    limitModel.find({},(err,data)=>{
        if(err){
            res.send({'err_code':400})
        }else{
            res.send({'err_code':200,info:data})
        }
    })
})

//第五个接口---根据id删除权限
app.get("/limitdel",(req,res)=>{
    //获取——id
    let _id=req.query.id
    //递归删除子权限
    treedel(_id)
    //删除自己
    limitModel.deleteMany({_id:_id},(err,data)=>{
        res.send({err_code:200})
    })
})
//递归删除子权限
function treedel(id,res){
    limitModel.find({"pid":id},(err,data)=>{
        if(data.length>0){
            for(let v of data){
                treedel(v._id)
                limitModel.deleteMany({_id:v._id},(err,data)=>{
                    // console.log(data)
                })
            }
        }
    })
}

//第六个接口  post ---角色名称  权限数组
const roleModel=require("./model/role.js")
app.post("/addrole",(req,res)=>{
    let {title,limitid}=req.body
    // console.log(req.body)
    roleModel.create({"title":title,"limitid":limitid},(err,data)=>{
        if(err){
            res.send({err_code:400})
        }else{
            res.send({err_code:200,info:data})
        }
    })
})
//第七个接口 get----获取所有的角色
app.get("/rolelist",(req,res)=>{
    roleModel.find({},(err,data)=>{
        if(err){
            res.send({'err_code':400})
        }else{
            res.send({'err_code':200,info:data})
        }
    })
})

//第八个接口--删除角色----get--接受id---通过id删除
app.get("/delrole",(req,res)=>{
    roleModel.deleteOne({_id:req.query.id},(err,data)=>{
        if(err){
            res.send({'err_code':400})
        }else{
            res.send({'err_code':200,info:data})
        } 
    })
})

//第九个接口--修改1 根据角色 id 获取角色信息
app.get("/roleinfo",(req,res)=>{
    roleModel.findOne({_id:req.query.id},(err,data)=>{
        if(err){
            res.send({'err_code':400})
        }else{
            res.send({'err_code':200,info:data})
        } 
    })
})

//第十个接口--修改2  post 角色名称 角色id -----根据角色id 修改数据
app.post("/roledit",(req,res)=>{
    let {id,title,limitid}=req.body
    roleModel.updateOne({_id:id},{title:title,limitid:limitid},(err,data)=>{
        if(err){
            res.send({'err_code':400})
        }else{
            res.send({'err_code':200})
        } 
    })
})

//第十一个接口--添加后台管理员----post --管理员名--角色id
app.post("/addperson",(req,res)=>{
    let {admin,roleid,password}=req.body
    adminModel.create({name:admin,password:password,roleid:roleid},(err,data)=>{
        if(err){
            res.send({'err_code':400})
        }else{
            res.send({'err_code':200,info:data})
        } 
    })
})

//第十二个接口--获取所有管理员
app.get("/getperson",(req,res)=>{
    // adminModel.findOne({},(err,data)=>{
    //     if(err){
    //         res.send({'err_code':400})
    //     }else{
    //         res.send({'err_code':200,info:data})
    //     } 
    // })
    adminModel.find().populate("roleid").exec((err,data)=>{
        res.send({"err_code":200,info:data})
    })
})

//第十三个接口----删除角色
app.get("/deladmin",(req,res)=>{
    adminModel.deleteOne({_id:req.query.id},(err,data)=>{
        if(err){
            res.send({'err_code':400})
        }else{
            res.send({'err_code':200})
        } 
    })
})

//第十四个接口---根据id查找管理员
app.get("/findadmin",(req,res)=>{
    let id=req.query.id
    adminModel.findOne({_id:id},(err,data)=>{
        if(err){
            res.send({'err_code':400})
        }else{
            res.send({'err_code':200,info:data})
        } 
    })
})
//第十五个接口---修改---admin password adminid
app.post("/editadmin",(req,res)=>{
    let {password,id,admin,roleid}=req.body
    adminModel.updateOne({_id:id},{"name":admin,"password":password,"roleid":roleid},(err,data)=>{
        if(err){
            res.send({'err_code':400})
        }else{
            res.send({'err_code':200})
        } 
    })
})
//第十六个接口---根据管理员id获取管理员信息以及权限
app.get("/getadmin",(req,res)=>{
    let id=req.query.id
    //查询管理员列表
    //id---查询管理员列表---jsid----角色---权限id----权限表
    adminModel.findOne({_id:id}).populate("roleid").exec((err,data)=>{
        // res.send(data)
        let admins={"_id":data._id,"name":data.name,"password":data.password}
        //获取到管理员对应的角色、角色对应的权限、但是权限是一个二维数组并没有重复
        //权限数组 降维 去重
        let limitid=data.roleid.limitid
        // console.log(limitid)
        let limit=Array.from(new Set(limitid.flat(Infinity)))
        
        // admins.limitarr=limit
        // res.send(admins)
        limitModel.find({_id:{$in:limit}},(err,data)=>{
            admins.limitarr=data
            res.send(admins)

        })
    })
})

//第十七个接口----根据管理员的id获取管理员 信息以及权限
app.get("/adminlimit",(req,res)=>{
    
})

//第十八个接口----判断是否有权限---get---name(路由name===权限表里的name)
app.get("/checklimit",(req,res)=>{
    let name=req.query.name
    let id=req.query.id
    //查找有那些权限
    adminModel.findOne({_id:id}).populate("roleid").exec((err,data)=>{
        //data={"_id":data._id,"name":data.name,"password":data.password}
        let limit=Array.from(new Set(data.roleid.limitid.flat(Infinity)))
        limitModel.find({_id:{$in:limit}},(err2,data2)=>{
            let f=data2.findIndex(val=>val.name==name)
            if(f>-1){
                res.send({err_code:200})
            }else{
                res.send({err_code:400})
            }

        })
    })
})

//第十九个接口---文件图片上传的接口
//用body接受是接收不到的
let multer=require("multer")
//硬盘存储
let storage = multer.diskStorage({
    // 文件存储路径
    destination: function (req, file, cb) {
        cb(null, "./public/sort")
    },
    //文件名
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
let up = multer({ storage: storage });
//静态资源发布
app.use(express.static('public'))
app.post("/fileup",up.single("picture"),(req,res)=>{
    // console.log(req.headers.host+"/sort/"+req.file.originalname)
    let imgurl=req.headers.host+"/sort/"+req.file.originalname
    res.send({imgurl:imgurl})
})
//商品分类
//第二十个接口--查找所有分类，返回
const goodsModel=require("./model/sortgoods")
app.get("/sortgoods",(req,res)=>{
    //monogoose--查找所有分类
    goodsModel.find({},(err,data)=>{
        if(err){
            res.send({'err_code':400})
        }else{
            res.send({'err_code':200,info:data})
        } 
    })
})
//第二十一个接口---添加分类
app.post("/addgoods",(req,res)=>{
    let {title,imgurl,pid}=req.body
    let obj={"title":title,"imgurl":imgurl,"pid":pid}
    goodsModel.create(obj,(err,data)=>{
        if(err){
            res.send({'err_code':400})
        }else{
            res.send({'err_code':200})
        } 
    })
})
//第二十二个接口---删除分类
//第二十一个接口---添加分类

app.listen("3000",function(){
    console.log("welcome 3000")
})