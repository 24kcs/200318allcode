<template>
  <div>About组件的界面内容
    <hr>
    <p>{{id}}</p>
    <p>{{age}}</p>
    <p>{{msg}}</p>
    <p>{{txt}}</p>
  </div>
</template>
<script>
export default {
  name: 'About',
  props:['id','age','msg','txt']
}
</script>
<style scoped>
</style>