<template>
  <el-form label-width="120px">
    <!--SPU 名称-->
    <el-form-item label="SPU 名称">
      <span>{{spuInfo.spuName}}</span>
    </el-form-item>
    <!--SKU 名称-->
    <el-form-item label="SKU 名称">
      <el-input type="text" placeholder="请输入SKU 名称"></el-input>
    </el-form-item>

    <!--SKU 价格-->
    <el-form-item label="SKU 价格">
      <el-input type="number" placeholder="请输入SKU 价格"></el-input>
    </el-form-item>

    <!--SKU 重量-->
    <el-form-item label="重量(千克)">
      <el-input type="number" placeholder="请输入SKU 重量"></el-input>
    </el-form-item>

    <!--SKU 规格描述-->
    <el-form-item label="规格描述">
      <el-input type="textarea" placeholder="请输入SKU 规格描述信息" rows="4"></el-input>
    </el-form-item>

    <!--SKU 平台属性-->
    <el-form-item label="平台属性">
      <el-form inline label-width="80px">
        <!--某个平台属性-->
        <el-form-item
          :label="attr.attrName"
          v-for="(attr,index) in attrList"
          :key="attr.id"
          style="margin-bottom:10px"
        >
          <el-select value>
            <el-option
              :value="value.id"
              :label="value.valueName"
              v-for="(value,index) in attr.attrValueList"
              :key="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <!--SKU 销售属性-->
    <el-form-item label="销售属性">
      <el-form inline label-width="80px">
        <!--某个销售属性-->
        <el-form-item
          :label="attr.saleAttrName"
          v-for="(attr,index) in saleAttrList"
          :key="attr.id"
        >
          <el-select value>
            <el-option
              :value="value.id"
              :label="value.saleAttrValueName"
              v-for="(value,index) in attr.spuSaleAttrValueList"
              :key="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <!--SKU 图片列表-->
    <el-form-item label="图片列表">
      <el-table border :data="imageList">
        <!--某一列-->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="图片" prop="imgUrl">
          <template slot-scope="{row,$index}">
            <img :src="row.imgUrl" alt="图片" width="100" height="100" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row,$index}">
            <el-button type="primary">设置为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="返回" @click="back">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      spuInfo: {}, // spu对象数据
      attrList: [], // 平台属性数据数组
      saleAttrList: [], // 销售属性数据数组
      imageList: [], // 图片列表数据数组
    }
  },
  methods: {
    initAddData(spuInfo) {
      // 保存当前的spuInfo对象
      this.spuInfo = spuInfo
      // 调用方法发送三个请求,获取平台属性数据/销售属性数据/图片列表数据
      this.getspuInfoInitData()
    },
    // 该方法内部发送三个请求,获取相关的数据
    async getspuInfoInitData() {
      const { category1Id, category2Id, category3Id, id } = this.spuInfo
      // 获取所有的平台属性信息数据数组----一级分类的id,二级分类的id,三级分类的id
      const promise1 = this.$API.attr.getAttrList(
        category1Id,
        category2Id,
        category3Id
      )
      // 获取所有的销售属性信息数据数组----需要spuId
      const promise2 = this.$API.sku.getSpuSaleAttrListBySpuId(id)
      // 获取所有的图片列表信息数据数组-----需要spuId
      const promise3 = this.$API.sku.getSpuImageListBySpuId(id)
      // 对所有的promise进行统一的处理
      const result = await Promise.all([promise1, promise2, promise3])
      // console.log(result)
      // 更新数据
      this.attrList = result[0].data // 平台属性
      this.saleAttrList = result[1].data // 销售属性
      this.imageList = result[2].data // 图片列表
    },

    // 返回按钮的回调函数

    back() {
      this.$emit('cancel')
    },
  },
}

// Sku界面  需要展示spu的名字

// 获取所有的平台属性数据-----发送了请求

// 获取当前的spu对象中所有的销售属性数据----发送请求

// 获取当前的spu对象中的图片列表数据----发送请求

// 当skuform组件界面出现后 该组件需要用到spuInfo对象中的相关数据----->在该组件出现的时候,传入spuInfo对象

// SkuForm界面出现传入spuInfo对象
// SkuForm界面出现需要发送3个请求
</script>
<style scoped>
</style>