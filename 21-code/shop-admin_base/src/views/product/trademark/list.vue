<template>
  <div>
    <!--添加按钮-->
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px">添加</el-button>
    <!--表格,stripe带有斑马纹的效果-->
    <el-table :data="trademarks" stripe style="width: 100%" border>
      <!--序号-->
      <el-table-column label="序号" align="center" type="index" width="80"></el-table-column>
      <!--名称-->
      <el-table-column prop="tmName" label="品牌名称"></el-table-column>
      <!--图片-->
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <!--图片标签-->
        <template slot-scope="scope">
          <img :src="logoUrl" alt="logo">
        </template>
      </el-table-column>
      <!--操作-->
      <el-table-column prop="address" label="操作">
        <!--template:模版 slot-scope:作用域插槽,scope:对象-->
        <template slot-scope="scope">
          <el-button type="warning" icon="el-icon-edit" size="small">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TrademarkList',
  data() {
    return {
      trademarks: [
        {
          tmName: '华为1',
          logoUrl:
            'http://182.92.128.115:8080/group1/M00/00/20/rBFUDF71kVmAKHqYAAIQgg_aZlk465.png',
        },
        {
          tmName: '华为2',
          logoUrl:
            'http://182.92.128.115:8080/group1/M00/00/20/rBFUDF71kVmAKHqYAAIQgg_aZlk465.png',
        },
      ],
    }
  },
}
</script>

<style>
</style>
