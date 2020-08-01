<template>
  <el-form label-width="120px">
    <!--SPU 名称-->
    <el-form-item label="SPU 名称">
      <span>{{spuInfo.spuName}}</span>
    </el-form-item>
    <!--SKU 名称-->
    <el-form-item label="SKU 名称">
      <el-input type="text" placeholder="请输入SKU 名称" v-model="skuInfo.skuName"></el-input>
    </el-form-item>

    <!--SKU 价格-->
    <el-form-item label="SKU 价格">
      <el-input type="number" placeholder="请输入SKU 价格" v-model="skuInfo.price"></el-input>
    </el-form-item>

    <!--SKU 重量-->
    <el-form-item label="重量(千克)">
      <el-input type="number" placeholder="请输入SKU 重量" v-model="skuInfo.weight"></el-input>
    </el-form-item>

    <!--SKU 规格描述-->
    <el-form-item label="规格描述">
      <el-input type="textarea" placeholder="请输入SKU 规格描述信息" rows="4" v-model="skuInfo.skuDesc"></el-input>
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
          <el-select v-model="attr.attrIdValueId">
            <el-option
              :value="attr.id+'_'+value.id"
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
          <el-select v-model="attr.saleAttrValueId">
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
      <el-table border :data="imageList" @selection-change="handleSelectionChange">
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
            <el-tag type="success" v-if="row.isDefault==='1'">默认</el-tag>
            <el-button type="primary" v-else @click="setDefault(row)">设置为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="返回" @click="back">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      // skuInfo对象数据---需要有添加该数据的相关的参数数据
      skuInfo: {
        // 直接在当前SkuForm组件显示出来的时候可以收集的数据
        spuId: '', // spu的id
        category3Id: '', // 三级分类的id
        tmId: '', // 品牌的id

        // 可以通过表单的方式进行收集
        skuName: '', // 名字
        price: 0, // 价格
        weight: '', // 重量
        skuDesc: '', // 描述信息
        // 点击保存按钮的时候进行数据的收集
        skuAttrValueList: [], // 平台属性数组---存放你选了的 平台属性的数据对象
        skuImageList: [], // 图片列表数据
        skuSaleAttrValueList: [], // 销售属性数据
        // 默认的数据
        skuDefaultImg: '', // 默认图片地址
        isSale: 0, // 上下架的标识
      },
      spuInfo: {}, // spu对象数据
      attrList: [], // 平台属性数据数组
      saleAttrList: [], // 销售属性数据数组
      imageList: [], // 图片列表数据数组
      selectedImageList: [], // 用来存储选中后的图片对象数组数据
    }
  },
  methods: {
    initAddData(spuInfo) {
      // 保存当前的spuInfo对象
      this.spuInfo = spuInfo
      // 收集:spuId/tmId---品牌的id/category3Id---三级分类的id
      this.skuInfo.spuId = spuInfo.id
      this.skuInfo.tmId = spuInfo.tmId
      this.skuInfo.category3Id = spuInfo.category3Id
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
      const imageList = result[2].data // 图片列表
      // 为每个图片信息数据对象添加了一个isDefault的属性,默认值是'0',间接的添加了响应式的数据
      imageList.forEach((item) => (item.isDefault = '0'))
      // 更新一下图片列表数据
      this.imageList = imageList

      // 通过$set()添加响应式的属性数据,是因为对象已经在data对象中定义了,暂时没有其他的属性,需要添加一个响应式的属性,所以,需要使用$set()方法
      // 上面的操作是直接把数据扔进了data对象中,连同这isDefault属性也在data中的imageList数组的对象中---响应式数据
    },

    // 点击设置为默认的 按钮 的回调函数
    setDefault(spuImage) {
      // 把spuImage中的isDefault 设置为1,此时就被默认选中了
      // spuImage.isDefault = '1' // 这个不行,因为当前的isDefault不是响应式的属性数据
      // this.$set(spuImage,'isDefault','1') 这个是可以的,因为这种方式是属于添加响应式的属性数据操作
      // 换一种方式,在获取这些图片的时候,直接就设置每个图片中就携带isDefault的这个属性值

      // 先把imageList数组中的每个对象中的isDefault数据设置为0
      this.imageList.forEach((item) => (item.isDefault = '0'))
      // 当前的这个spuImage图片对象设置为1
      spuImage.isDefault = '1'

      // 把这个默认被选中的图片对象中的图片地址取出来进行保存
      this.skuInfo.skuDefaultImg = spuImage.imgUrl
    },
    // 只要是表格中有了选中的操作,就会执行该回调函数
    handleSelectionChange(val) {
      // 把选中的图片对象放在一个数组中,再次的更行 selectedImageList 数组数据
      this.selectedImageList = val
    },

    // 保存skuInfo操作

    async save() {
      // 收集数据
      const { skuInfo, attrList, saleAttrList, selectedImageList } = this

      // 对选中的平台属性数据attrList数组进行筛选操作,然后把筛选后的数据更新到skuInfo对象的skuAttrValueList数组中
      skuInfo.skuAttrValueList = attrList.reduce((pre, attr) => {
        // 获取当前被选中的平台属性中存储的(平台属性id和属性值id数据)
        const attrIdValueId = attr.attrIdValueId
        // 判断该数据是否存在----->如果选择了某个平台属性值,那么就有数据
        if (attrIdValueId) {
          const [attrId, valueId] = attrIdValueId.split('_')
          pre.push({
            attrId,
            valueId,
          })
        }
        // 把添加了平台属性的数组返回
        return pre
      }, [])

      // 收集并筛选 销售属性数据saleAttrList,并存储到skuInfo对象的skuSaleAttrValueList
      skuInfo.skuSaleAttrValueList = saleAttrList.reduce((pre, attr) => {
        // 获取每个销售属性对象中的saleAttrValueId 属性值
        const saleAttrValueId = attr.saleAttrValueId
        // 判断该属性值是否存在,也就意味着,如果该属性值存在,则这个销售属性值就被选中
        if (saleAttrValueId) {
          pre.push({
            saleAttrValueId,
          })
        }
        return pre
      }, [])

      // 获取选中的图片信息数据,从selectedImageList数组中获取,添加到skuInfo对象的skuImageList数组中
      skuInfo.skuImageList = selectedImageList.map((item) => ({
        spuImgId: item.id, // 当前选中的这个图片的id
        imgName: item.imgName, // 当前选中的图片的名字
        imgUrl: item.imgUrl, // 当前选中的图片的地址
        isDefault: item.isDefault, // 当前选中的图片的默认标识
      }))

      // 调用api接口函数,发送请求
      const result = await this.$API.sku.addOrUpdateSkuInfo(skuInfo)
      if (result.code === 200) {
        // 提示
        this.$message.success('保存SKU成功')
        // 重置数据
        this.resetData()
        // 关闭当前对话框
        this.$emit('success')
      } else {
        // 提示信息
        this.$message.error('保存SKU失败')
      }

      // 关闭当前对话框,重置数据操作

      // id: 3675
      // imgName: "34ea99fe4d1d80bf.png"
      // imgUrl: "http://182.92.128.115:8080/group1/M00/00/30/rBFUDF8k1QWAVUXMAALLg55w-7E067.png"
      // isDefault: "0"
      // spuId: 690

      // "spuImgId": 0 ---当前的图片的id值
      // "imgName": "string", ---图片的名字
      // "imgUrl": "string", ---图片的地址
      // "isDefault": "string", ---默认的图片
    },
    // 重置数据的方法
    resetData() {
      this.skuInfo = {
        // 直接在当前SkuForm组件显示出来的时候可以收集的数据
        spuId: '', // spu的id
        category3Id: '', // 三级分类的id
        tmId: '', // 品牌的id

        // 可以通过表单的方式进行收集
        skuName: '', // 名字
        price: 0, // 价格
        weight: '', // 重量
        skuDesc: '', // 描述信息
        // 点击保存按钮的时候进行数据的收集
        skuAttrValueList: [], // 平台属性数组---存放你选了的 平台属性的数据对象
        skuImageList: [], // 图片列表数据
        skuSaleAttrValueList: [], // 销售属性数据
        // 默认的数据
        skuDefaultImg: '', // 默认图片地址
        isSale: 0, // 上下架的标识
      }
      this.spuInfo = {} // spu对象数据
      this.attrList = [] // 平台属性数据数组
      this.saleAttrList = [] // 销售属性数据数组
      this.imageList = [] // 图片列表数据数组
      this.selectedImageList = [] // 用来存储选中后的图片对象数组数据
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