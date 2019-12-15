//载入vue
import Vue from "vue"
//载入vuex
import Vuex from "vuex"
//使用vuex
Vue.use(Vuex)
//创建仓库
const store=new Vuex.Store({
    //状态
    state:{
        //规格数组
        stArr:[
            {
                "name":"8G",
                stritem:[
                    {"itemname":"白色","price":100},
                    {"itemname":"黑色","price":300},
                ]
            },
            {
                "name":"16G",
                stritem:[
                    {"itemname":"白色","price":500},
                    {"itemname":"黑色","price":300},
                ]
            }
    ]
    },
    //方法---可以是异步的操作
    actions:{

    },
    //唯一改变state的方法
    mutations:{
        //添加一整项规则
        add(state){
            state.stArr.push({
                "name":"",
                stritem:[
                    {"itemname":"","price":""},
                ]
            })        
        },
        // 删除一整项规则
        del(state,index){
            state.stArr.splice(index,1)
        },
        //添加一项规则
        addone(state,index){
            state.stArr[index].stritem.push({"itemname":"","price":""})
        },
        delone(state,obj){
            let {stindex,stritemindex}=obj
            state.stArr[stindex].stritem.splice(stritemindex,1)
        },
        //修改----stArr[stindex].stritem---stindex，name
        editname(state,obj){
            let {stindex,name}=obj
            state.stArr[stindex].name=name

        }
    },
    //相当于计算属性
    getters:{

    }
})

export default store