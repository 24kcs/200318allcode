<template>
  <div>
    <!--三级分类的-->
    <el-card>
      <CategorySelector @changeCategory="changeCategory" />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PropList',
  data() {
    return {
      category1Id: '', // 一级分类的id
      category2Id: '', // 二级分类的id
      category3Id: '', // 三级分类的id
    }
  },
  methods: {
    // 保存当前的分类信息的id值,及调用接口发送请求获取 平台属性列表数据数组
    // categoryId参数: 一级id/二级id/三级id, categoryLevel参数:1/2/3
    // 只有是三级分类id的时候才调用接口发送请求,获取平台属性信息数据
    changeCategory({ categoryId, categoryLevel }) {
      if (categoryLevel === 3) {
        // 三级id
        this.category3Id = categoryId
        // 调用接口发送请求
      } else if (categoryLevel === 1) {
        // 一级id
        this.category1Id = categoryId
      } else if (categoryLevel === 2) {
        // 二级id
        this.category2Id = categoryId
      }
      // 输出id和级别
      // console.log(categoryId, categoryLevel)
    },
  },
}
</script>

<style scoped>
.edit-input {
  padding-right: 60px;
}
.save-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

