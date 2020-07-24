<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHideFooter"/>
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入Footer组件
import Footer from './components/Footer'
// 引入api接口函数
// import {reqBaseCategoryList} from './api'
export default {
  name:'App',
  // 注册组件
  components:{
    Header,
    Footer
  },
  mounted () {
    this.$store.dispatch('getBaseCategoryList')
  }
  // 界面加载后的生命周期回调
  // async mounted () {
  //   const result = await reqBaseCategoryList()
  //   console.log(result)
  // }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>