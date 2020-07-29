<template>
  <!--表单标签-->
  <el-form inline :model="form">
    <!--表单项-->
    <el-form-item label="一级分类">
      <!--一级分类-->
      <el-select v-model="form.category1Id" placeholder="请选择" @change="changeCategory1List" :disabled="isDisabled">
        <!--遍历一级分类信息数据-->
        <el-option v-for="item in category1List" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <!--表单项-->
    <el-form-item label="二级分类">
      <!--二级分类-->
      <el-select v-model="form.category2Id" placeholder="请选择" @change="changeCategory2List" :disabled="isDisabled">
        <!--遍历二级分类信息数据-->
        <el-option v-for="item in category2List" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <!--表单项-->
    <el-form-item label="三级分类">
      <!--三级分类-->
      <el-select v-model="form.category3Id" placeholder="请选择" @change="changeCategory3List" :disabled="isDisabled">
        <!--遍历二级分类信息数据-->
        <el-option v-for="item in category3List" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'CategorySelector',
  data() {
    return {
      form: {
        category1Id: '', // 用来存储一级分类的id数据
        category2Id: '', // 用来存储二级分类的id数据
        category3Id: '', // 用来存储三级分类的id数据
      },
      category1List: [], // 一级分类的列表数组数据
      category2List: [], // 二级分类的列表数组数据
      category3List: [], // 三级分类的列表数组数据
      isDisabled:false // 默认是false,三个下拉框都可以正常的使用,如果为true,则下拉框禁用
    }
  },
  // 界面加载后的生命周期回调
  mounted() {
    // 获取一级分类信息列表数据
    this.getCategory1List()
  },
  methods: {
    // 获取一级分类信息列表数据
    async getCategory1List() {
      // 调用接口
      const result = await this.$API.category.getCategorys1()
      if (result.code === 200) {
        // 如果没问题,则直接获取一级分类的信息数据列表,并保存起来
        this.category1List = result.data
      }
    },
    // 一级分类的选中内容变化后,立刻获取二级分类的数据
    async changeCategory1List(category1Id) {
      // 清空二级/三级分类的id及对应的数组数据
      this.form.category2Id = null
      this.form.category3Id = null
      this.category2List = []
      this.category3List = []
      // 该事件触发后,默认的参数是当前选中的一级分类的数据对应的id值
      // 调用接口,发送请求
      const result = await this.$API.category.getCategorys2(category1Id)
      if (result.code === 200) {
        // 更新二级分类的信息数据列表
        this.category2List = result.data
      }
      // 分发的是父级组件传递过来的自定义事件,同时传递一级分类的id及级别1
      this.$emit('changeCategory', {
        categoryId: category1Id,
        categoryLevel: 1,
      })
    },
    // 二级分类选中内容变化后,立刻获取三级分类的数据
    async changeCategory2List(category2Id) {
      // 清空三级分类的id及对应的数组数据
      this.form.category3Id = null
      this.category3List = []
      // 该事件触发后,默认的参数是当前选中的一级分类的数据对应的id值
      // 调用接口,发送请求
      const result = await this.$API.category.getCategorys3(category2Id)
      if (result.code === 200) {
        // 更新二级分类的信息数据列表
        this.category3List = result.data
      }
      // 分发的是父级组件传递过来的自定义事件,同时传递二级分类的id及级别2
      this.$emit('changeCategory', {
        categoryId: category2Id,
        categoryLevel: 2,
      })
    },
    // 三级分类选中内容变化后,立刻分发父级组件的自定义事件
    changeCategory3List(category3Id) {
      // 分发的是父级组件传递过来的自定义事件,同时传递三级分类的id及级别2
      this.$emit('changeCategory', {
        categoryId: category3Id,
        categoryLevel: 3
      })
    },
  },
}
</script>
<style scoped>
</style>