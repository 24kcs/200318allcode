<template>
  <!--表单标签-->
  <el-form v-show="visible" label-width="100px">
    <!--Spu名称-->
    <el-form-item label="SPU名称">
      <el-input type="text" placeholder="SPU 名称" v-model="spuInfo.spuName"></el-input>
    </el-form-item>
    <!--Spu品牌-->
    <el-form-item label="SPU品牌">
      <el-select v-model="spuInfo.tmId">
        <el-option
          :label="trademark.tmName"
          :value="trademark.id"
          v-for="(trademark,index) in trademarkList"
          :key="trademark.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <!--Spu描述-->
    <el-form-item label="SPU描述">
      <el-input type="textarea" rows="4" placeholder="请输入SPU描述" v-model="spuInfo.description"></el-input>
    </el-form-item>
    <!--SPU的图片展示-->
    <el-form-item label="SPU图片">
      <!--展示当前的图片列表数据,上传多个图片,,有预览的效果,图片如果上传成功了,需要重新更新一下spuImageList数组-->
      <el-upload
        multiple
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :file-list="spuImageList"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
      >
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </el-form-item>
    <!--销售属性-->
    <el-form-item label="销售属性">
      <el-select value>
        <el-option
          :label="attr.name"
          :value="attr.id"
          v-for="(attr,index) in unSelectedSaleAttrList"
          :key="attr.id"
        ></el-option>
      </el-select>
      <!--按钮-->
      <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px">添加销售属性</el-button>
      <!--表格-->
      <el-table border inline>
        <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
        <el-table-column label="属性名"></el-table-column>
        <el-table-column label="属性值"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row,$index}">
            <el-popconfirm title="`确定要删除  吗`">
              <HintButton
                slot="reference"
                title="删除SPU"
                type="danger"
                icon="el-icon-delete"
                size="mini"
              />
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="back">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SpuForm',
  props: ['visible'],
  data() {
    return {
      spuId: null, // 用来存储spuId数据的
      spuInfo: {
        spuSaleAttrList:[] // 当前的spuInfo对象中已经存在销售属性的数组
      }, // 用来保存获取到的spu对象的数据
      spuImageList: [], // 用来存储spu对象对应的图片列表数组数据
      trademarkList: [], // 用来存储所有的品牌信息数据的数组
      saleAttrList: [], // 用来存储所有的销售属性列表数组数据

      // 上传图片组件需要的表达式
      dialogImageUrl: '', // 预览图片的地址
      dialogVisible: false, // 是否展示预览的效果
    }
  },
  computed: {
    // 数组---->把spuInfo对象中spuSaleAttrList数组(已经添加销售属性之后的数组--1个数据)
    // 数组---->saleAttrList中所有的销售属性
    unSelectedSaleAttrList() {
      // 获取saleAttrList--->所有销售属性的数组
      // 获取spuInfo对象中已经存在的销售属性的数组spuSaleAttrList
      const {
        saleAttrList,
        spuInfo: { spuSaleAttrList },
      } = this
      return saleAttrList.filter(
        (sa) => !spuSaleAttrList.some((ssa) => ssa.saleAttrName === sa.name)
      )
    },
  },
  methods: {
    // 初始化数据的方法---->当前的spuInfo对象,spuInfo对象对应的图片列表数据,所有的品牌和所有的销售属性
    initUpdateData(spuId) {
      // 更新spuId数据
      this.spuId = spuId

      // 根据spuId获取spuInfo对象数据
      this.getSpuInfo()
      // 根据spuId获取supInfo对象的图片列表数据
      this.getSpuImageListBySpuId()
      // 获取所有的品牌信息数据
      this.getTrademarkList()
      // 获取所有的销售属性属性
      this.getBaseSaleAttrList()
    },
    // 根据spuId获取spuInfo对象数据
    async getSpuInfo() {
      const result = await this.$API.spu.getSpuInfoBySpuId(this.spuId)
      if (result.code === 200) {
        // 更新spuInfo对象数据
        this.spuInfo = result.data
      }
    },
    // 根据spuId获取supInfo对象的图片列表数据
    async getSpuImageListBySpuId() {
      const result = await this.$API.sku.getSpuImageListBySpuId(this.spuId)
      if (result.code === 200) {
        // 更新spuInfo对象的图片数组
        const spuImageList = result.data
        // 筛选操作,遍历图片数组,把里面的图片名字和图片地址重新的赋值给name属性和url属性
        spuImageList.forEach((item) => {
          // 重新添加一个name属性存储之前的imgName的属性值
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageList = spuImageList
      }
    },

    // 获取所有的品牌信息数据
    async getTrademarkList() {
      const result = await this.$API.trademark.getTrademarkList()
      if (result.code === 200) {
        this.trademarkList = result.data
      }
    },
    // 获取所有的销售属性属性
    async getBaseSaleAttrList() {
      const result = await this.$API.spu.getBaseSaleAttrList()
      if (result.code === 200) {
        this.saleAttrList = result.data
      }
    },
    // 移除图片的操作
    handleRemove(file, fileList) {
      // 再次的更新图片数组
      this.spuImageList = fileList
    },
    // 设置图片是否有预览的效果
    handlePictureCardPreview(file) {
      // 设置预览图片的地址
      this.dialogImageUrl = file.url
      // 有预览的效果
      this.dialogVisible = true
    },

    // 图片上传成功的回调
    // response--->上传成功的响应对象,file--->上传图片的信息数据,fileList--->上传图片的数组
    handleAvatarSuccess(response, file, fileList) {
      // 更新操作
      this.spuImageList = fileList
    },

    // 返回按钮的点击事件----隐藏当前的SpuForm组件
    back() {
      // 不能够直接修改父级组件中isShowSpuForm表达式的值(不能控制当前的这个组件显示或者隐藏)
      // this.visible = false
      // 分发父级组件的update:visible事件
      this.$emit('update:visible', false)
    },
  },
}
</script>
<style scoped>
</style>