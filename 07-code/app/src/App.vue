<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对Vue的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <!--左侧需要添加数据的一块-->
      <Add/>
      <!--展示评论数据的一块-->
      <List/>
    </div>
  </div>
</template>
<script>
// 引入Add组件
import Add from './components/Add'
// 引入List组件
import List from './components/List'
export default {
  name: 'App',
  components:{
    Add,
    List
  }
}
</script>
<style scoped>
</style>