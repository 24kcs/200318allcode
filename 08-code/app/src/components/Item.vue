<template>
  <li class="list-group-item">
    <div class="handle">
      <a href="javascript:;" @click="del">删除</a>
    </div>
    <p class="user">
      <span>{{c.userName}}</span>
      <span>说:</span>
    </p>
    <p class="centence">{{c.content}}</p>
  </li>
</template>
<script>
export default {
  name: 'Item',
  props: {
    c: Object,
    index: Number
  },
  methods: {
    // 删除的方法
    del() {
      // 友好的提示框
      if (window.confirm('大哥,确定要把我干掉吗')) {
        this.$eventBus.$emit('deleteCommentByIndex', this.index)
      }
    }
  }
}
</script>
<style scoped>
li {
  transition: 0.5s;
  overflow: hidden;
}

.handle {
  width: 40px;
  border: 1px solid #ccc;
  background: #fff;
  position: absolute;
  right: 10px;
  top: 1px;
  text-align: center;
}

.handle a {
  display: block;
  text-decoration: none;
}

.list-group-item .centence {
  padding: 0px 50px;
}

.user {
  font-size: 22px;
}
</style>