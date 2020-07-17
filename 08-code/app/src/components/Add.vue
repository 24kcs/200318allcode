<template>
  <div class="col-md-4">
    <form class="form-horizontal">
      <div class="form-group">
        <label>用户名</label>
        <input type="text" class="form-control" placeholder="用户名" v-model="userName" />
      </div>
      <div class="form-group">
        <label>评论内容</label>
        <textarea class="form-control" rows="6" placeholder="评论内容" v-model="content"></textarea>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="button" class="btn btn-default pull-right" @click="add">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Add',
  data() {
    return {
      userName: '', // 存储用户名字
      content: '' // 获取评论内容
    }
  },
  methods: {
    add() {
      // 获取用户名字和评论内容
      const userName = this.userName.trim()
      const content = this.content.trim()
      // 有名字并且有评论内容,添加数据才有意义
      if (userName && content) {
        // 定义要添加的这个对象
        const c = {
          id: Date.now(),
          userName,
          content
        }
        // 分发事件
        this.$emit('addCommnets', c)
      }
      // 清空所有的数据
      this.userName = ''
      this.content = ''
    }
  }
}
</script>
<style scoped>
</style>