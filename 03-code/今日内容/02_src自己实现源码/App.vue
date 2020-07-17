<template>
  <div>
    App组件
    <ul>
      <li v-for="(item,index) in persons" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      persons: [{ id: 1, name: '小明', age: 10 }]
    }
  }
}
</script>
<style scoped>
</style>
