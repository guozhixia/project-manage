<template>
    <div>
        <!-- 要知道STarr的下标和stitem的下标 -->
                <button @click="delone({'stindex':stindex,'stritemindex':stritemindex})">X</button>
                <input type="text" v-model="stritem.itemname" placeholder="规格参数名">
                <input type="text" v-model="stritem.price" placeholder="价格"><br>
                
            </div>
</template>

<style>

</style>

<script>
import {mapMutations} from "vuex"
export default {
    props:["stritem","stritemindex","stindex"],
    methods:{
        ...mapMutations(["delone"]),
    }
}
</script>