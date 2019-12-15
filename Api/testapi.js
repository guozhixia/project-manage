//生成数据
// let arr=[{"goodsname":"鲜花","price":"100"},{"goodsname":"香水","price":"200"}]
let arr=[]
for(let i =0;i<31;i++){
    arr.push({"goodsname":"香氛"+i,"price":100*i})
}
const testModel=require("./model/test.js")

testModel.create(arr,(err,data)=>{
    console.log(err)
})