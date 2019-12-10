     //处理无限极分类的方法
    function tree(info,pid){
          let data=[]
          for(let i in info ){
              if(info[i].pid==pid){
                  var x={
                      value:info[i]._id,
                      label:info[i].title,
                      children:tree(info,info[i]._id)
                  }
                  //如果没有子权限就删除第一个属性
                  if(x.children.length==0){
                      delete x.children
                  }
                  data.push(x)
              }
          }
          
          return data
      }
      export default tree