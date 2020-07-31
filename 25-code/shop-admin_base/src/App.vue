<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  // async mounted () {
  //   // const result = await this.$API.trademark.getTrademarkList(1,5)
  //   // console.log(result)
  //   // 测试spu列表数据和sku列表数据
  //   const result1 = await this.$API.spu.getSpuList(1,3,61)
  //   const result2 = await this.$API.sku.getSkuList(1,3)
  //   console.log(result1)
  //   console.log(result2)
  // }
}
</script>
