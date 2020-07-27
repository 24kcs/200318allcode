<template>
  <a href="javascript:;" :title="title">
    <el-button v-bind="$attrs" v-on="$listeners">{{title}}操作</el-button>
  </a>
</template>

<script>
export default {
  name: 'LinkButton',
  props:['title'],
  // mounted () {
  //   // 获取父级组件向子级组件传递的所有的属性(props和class和style不包含在内)
  //   console.log(this.$attrs)
  //   // 获取父级组件向子级组件传递的所有的自定义事件(.native除外)
  //   console.log(this.$listeners)
  // }
}
</script>

<style lang="less" scoped>
</style>
