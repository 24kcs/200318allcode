<template>
  <div>
    我是Add组件中的另一个组件ShowMsg组件中的内容
    <p>{{$route.params.text}}</p>
  </div>
</template>
<script>
export default {
  name:'ShowMsg'
}
</script>
<style scoped>
</style>