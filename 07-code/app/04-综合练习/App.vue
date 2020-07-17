<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对React的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <Add @addComment="addComment" />
      <List :comments="comments" />
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
  components: {
    Add,
    List
  },
  data() {
    return {
      comments: [
        { id: 1, userName: '小明', content: '今天我们学习Vue' },
        { id: 2, userName: '小红', content: '今天我们学习React' },
        { id: 3, userName: '小丽', content: '今天我们学习vue-router' },
        { id: 4, userName: '小花', content: '今天我们学习vuex' }
      ]
    }
  },
  methods: {
    // 添加数据
    addComment(c){
      this.comments.unshift(c)
    }
  },
  mounted () {
    // 事件总线
    this.$bus.$on('deleteComment',(index)=>{
      this.comments.splice(index,1)
    })
  },
  beforeDestroy () {
    // 解绑事件
    this.$bus.$off()
  }
}
</script>
<style scoped>
</style>