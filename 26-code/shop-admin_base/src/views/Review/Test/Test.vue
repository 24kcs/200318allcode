<template>
 <div>
   <input ref="txt" type="text" v-model="title" />
   <button @click="updateTitle">修改数据</button>
   <div>
     <router-link to="/review/test/test1">第一个</router-link>
     <router-link to="/review/test/test2">第二个</router-link>
   </div>
   <!--缓存起来-->
    <keep-alive>
       <router-view></router-view>
    </keep-alive>
     <!-- <router-view></router-view> -->
 </div>
</template>

<script>

export default {
  data () {
    return {
      title:'111'  
    }
  },
  // 数据初始化之前的回调函数----生命周期的回调函数
  beforeCreate () {
    console.log('数据初始化之前',this.title)
  },
  created () {
    console.log('数据初始化之后',this.title)
  },
  beforeMount () {
    console.log('界面显示前',this.title)
  },
  mounted () {
    console.log('界面显示后',this.title)
  },
  beforeUpdate () {
    console.log('界面更新前',this.title,this.$refs.txt.value)
  },
  updated () {
    console.log('界面更新后',this.title,this.$refs.txt.value)
  },
  beforeDestroy () {
    console.log('卸载前')
  },
  destroyed () {
    console.log('卸载后')
  },
 
  methods: {
    updateTitle(){
      this.title='222'
    }
  }
 
}
</script>

<style>

</style>
