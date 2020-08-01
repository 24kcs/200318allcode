<template>
  <div>
    第一个组件
  </div>
</template>
<script>
export default {
  // 生命周期的回调---激活的时候
  activated () {
    console.log('激活的时候调用')
  },
  // 停用的时候
  deactivated(){
    console.log('组件停用时候调用')
  },
}
</script>
<style scoped>
</style>