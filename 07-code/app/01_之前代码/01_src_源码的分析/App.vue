<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--使用组件-->
    <HelloWorld/>
  </div>
</template>

<script>
// 引入HelloWorld 组件
import HelloWorld from './components/HelloWorld'
// 向外暴露对象(组件就是一个对象)
export default {
  // 设置当前组件的名字
  name: 'App',
  // 注册组件
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
