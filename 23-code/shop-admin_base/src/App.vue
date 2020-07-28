<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
  // async mounted () {
  //   const result = await this.$API.trademark.getTrademarkList(1,5)
  //   console.log(result)
  // }
}
</script>
