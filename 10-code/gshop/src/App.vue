<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入Footer组件
import Footer from './components/Footer'
export default {
  name:'App',
  // 注册组件
  components:{
    Header,
    Footer
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>