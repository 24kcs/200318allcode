<template>
  <div class="container">
    <!--Search部分-->
    <Search/>
    <!--Main主体列表部分-->
    <Main/>
  </div>
</template>
<script>
// 引入Search组件
import Search from './components/Search'
// 引入Main组件
import Main from './components/Main'
export default {
  name: 'App',
  components:{
    Search,
    Main
  }
}
</script>
<style scoped>
</style>