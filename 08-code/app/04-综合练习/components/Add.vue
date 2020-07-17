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
      userName: '', // 获取用户名字
      content: '' // 获取评论内容
    }
  },
  methods: {
    add() {
      // 获取用户名和评论内容
      const userName = this.userName.trim()
      const content = this.content.trim()
      // 判断用户名和评论内容存在
      if (userName && content) {
        const comment = {
          id: Date.now(),
          userName,
          content
        }
        console.log(comment)
        this.$emit('addComment', comment)
        // 清空
        this.userName = ''
        this.content = ''
      }
    }
  }
}
</script>
<style scoped>
</style>