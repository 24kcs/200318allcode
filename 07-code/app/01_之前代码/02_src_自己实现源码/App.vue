<template>
  <!--每个组件内部的html代码必须在根标签中书写,template模版中必须只有一个对根标签-->
  <div>
    App组件啊,哈哈,测试啊,好神奇
    <hr />超哥
    <!--使用组件,组件的名字在使用的时候可以是小写的,如果多个单词都是小写,中间用-隔开,但是建议用大写的,原因:有可能组件的名字和html标签名字重复,组件当成标签使用的时候,可以是成对的,也可以是单独的,但是单独使用的组件标签,必须要有结束-->
    <Hello />
    <Hello />
    <Hello />
    <Hello />
    <Hello />
    <Hello />
    <Hello />
  </div>
</template>
<script>
// 引入Hello组件
import Hello from './components/Hello'
export default {
  // 设置当前组件的名字
  name: 'App',
  // 注册组件
  components: {
    Hello
  }
}
</script>
<style>
div {
  color: red;
}
</style>
