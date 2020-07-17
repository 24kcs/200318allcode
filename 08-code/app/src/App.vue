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
      <Add @addCommnets="addCommnets" />
      <!--展示评论数据的一块-->
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
        { id: 1, userName: '小黄', content: '学习Vue' },
        { id: 2, userName: '小红', content: '学习React' },
        { id: 3, userName: '小绿', content: '学习JS' },
        { id: 4, userName: '小白', content: '学习HTML' }
      ]
    }
  },
  methods: {
    // 为数组添加一个数据
    addCommnets(c) {
      // 向数组中的最前面插入一个数据
      this.comments.unshift(c)
    },
    // // 删除数据
    // deleteCommentByIndex(index) {
    //   this.comments.splice(index, 1)
    // }
  },
  // 界面加载完毕的生命周期回调函数
  mounted () {
    // 通过事件总线绑定一个删除数据的操作
    this.$eventBus.$on('deleteCommentByIndex',(index)=>{
       this.comments.splice(index, 1)
    })
  }
}
</script>
<style scoped>
</style>