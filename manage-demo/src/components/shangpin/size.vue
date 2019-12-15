<template>
    <div class="size">
             <button @click="del">X</button>
            <div classs="left">
                <input type="text"  placeholder="规格名称" v-model="st.name">
            </div>
            <div class="line"></div>
            <div class="right">
                <sizeright v-for="(v,i) in st.stritem" :key="i" :stritem="v" :stritemindex="i" :stindex="stindex"></sizeright>
                <button @click="addone(stindex)">增加规格参数</button>
            </div>
        </div>
</template>
<style scoped>
.size{
    display: flex;
    justify-content: space-around;
    /* border: 1px solid black; */
    background:#eee;
    margin-top: 15px;
}
.line{
    /* border-right: 1px solid black; */
    margin: 0 10px;
}
input{
    margin: 10px 10px;
}
</style>

<script>
import sizeright from "@/components/shangpin/size-right.vue"
import {mapMutations} from "vuex"
export default {
    props:["st","stindex"],
    components:{
        sizeright
    },
    methods:{
        ...mapMutations(["del","addone","editname"]),
    }
}
</script>