<template>
  <div>Add这个组件内容
    <h2>
      <router-link to="/add/showmsg/123">显示ShowMsg组件内容</router-link>
    </h2>
    <hr>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Add'
}
</script>
<style scoped>
</style>