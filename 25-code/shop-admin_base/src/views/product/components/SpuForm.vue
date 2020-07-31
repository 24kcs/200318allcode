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
      <el-select
        v-model="attrIdAttrName"
        :placeholder="unSelectedSaleAttrList.length>0?`还有${unSelectedSaleAttrList.length}个可选`:'没有了'"
      >
        <el-option
          :label="attr.name"
          :value="attr.id+':'+attr.name"
          v-for="(attr,index) in unSelectedSaleAttrList"
          :key="attr.id"
        ></el-option>
      </el-select>
      <!--按钮-->
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin-bottom:20px"
        :disabled="!attrIdAttrName"
        @click="addAttr"
      >添加销售属性</el-button>
      <!--表格-->
      <el-table border inline :data="spuInfo.spuSaleAttrList">
        <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
        <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
        <el-table-column label="属性值">
          <!--属性值,每个数据都应该是一个对象-->
          <template slot-scope="{row,$index}">
            <!--查看模式-->
            <el-tag
              style="margin-left:5px"
              :key="value.id"
              v-for="(value,index) in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close="handleClose(row.spuSaleAttrValueList,index)"
            >{{value.saleAttrValueName}}</el-tag>
            <!--编辑模式-->
            <el-input
              style="width:80px"
              class="input-new-tag"
              v-if="row.edit"
              v-model="row.saleAttrValueName"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">+ 添加</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row,$index}">
            <el-popconfirm title="`确定要删除属性吗`" @onConfirm="deleteSaleAttr($index)">
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
      <el-button type="primary" @click="save">保存</el-button>
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
        spuSaleAttrList: [], // 当前的spuInfo对象中已经存在销售属性的数组
      }, // 用来保存获取到的spu对象的数据
      spuImageList: [], // 用来存储spu对象对应的图片列表数组数据
      trademarkList: [], // 用来存储所有的品牌信息数据的数组
      saleAttrList: [], // 用来存储所有的销售属性列表数组数据

      // 上传图片组件需要的表达式
      dialogImageUrl: '', // 预览图片的地址
      dialogVisible: false, // 是否展示预览的效果
      attrIdAttrName: '', // 用来存储选中的销售属性的id和销售属性的名字   '1:选择颜色'

      // 当前的销售属性的表格中 属性值 这一列中需要的数据表达式
      // dynamicTags: ['标签一', '标签二', '标签三'],
      // inputVisible: false, // 如果为false 就是查看模式,如果为true则就是编辑模式(input出来了)
      // inputValue: '', // 保存的当前在文本框中输入的属性值数据
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

    // 点击删除按钮,移除当前spuInfo对象中spuSaleAttrList数组中的某个销售属性对象
    deleteSaleAttr(index) {
      this.spuInfo.spuSaleAttrList.splice(index, 1)
    },

    // 从当前的属性值数组中移除当前的属性值对象
    handleClose(valueList, index) {
      valueList.splice(index, 1)
    },
    // 点击添加按钮,实现  进入到编辑模式,同时 获取焦点操作
    showInput(attr) {
      // 此时进入了编辑模式
      // 这么做是不行的,因为当前的attr对象属于响应式的对象,edit属性属于非响应式的属性,界面是不会渲染变化的
      // attr.edit = true
      // 此时edit属性是响应式的属性了,界面可以有渲染的变化了,就可以有编辑的模式了
      if (!attr.hasOwnProperty('edit')) {
        this.$set(attr, 'edit', true)
      } else {
        attr.edit = true
      }
      // 自动的获取焦点
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus()
      })
    },
    // 回车或者失去焦点的事件的 回调函数
    handleInputConfirm(attr) {
      // 获取当前文本框中输入的数据
      const saleAttrValueName = attr.saleAttrValueName
      // 判断当前文本框中输入的数据是否存在
      if (saleAttrValueName) {
        // 筛选重复的数据
        const isRepeat = attr.spuSaleAttrValueList.some(
          (value) => value.saleAttrValueName === saleAttrValueName
        )
        // 判断,如果没有重复的数据,才添加
        if (!isRepeat) {
          // 此时文本框中有值,就应该把这个值添加到
          attr.spuSaleAttrValueList.push({
            baseSaleAttrId: attr.baseSaleAttrId, // 当前销售属性的id值
            saleAttrValueName, // 当前文本框输入的属性值
          })
        } else {
          // 此时有重复的数据
          this.$message.warning('不能添加重复的数据')
          return
        }
      }
      // 查看模式了
      attr.edit = false
      // 清空文本框的数据
      attr.saleAttrValueName = ''
    },

    // 添加添加销售属性的按钮,向spuInfo对象的spuSaleAttrList数组中添加一个对象---销售属性对象
    addAttr() {
      // 获取当前的销售属性的id和名字
      const [baseSaleAttrId, saleAttrName] = this.attrIdAttrName.split(':')
      // 添加销售属性的操作
      this.spuInfo.spuSaleAttrList.push({
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      })
      // 清空当前的下拉框中保存的id和名字
      this.attrIdAttrName = ''
    },

    // 保存操作
    async save() {
      // 保存的spuInfo 数据
      // 获取spuInfo对象及图片数组列表数据
      const { spuInfo, spuImageList } = this
      // 操作筛选spuImageList中的数据
      spuInfo.spuImageList = spuImageList.map((item) => ({
        imgName: item.name,
        // 如果这里有新上传的图片,那么就冲新的图片对象中找response对象里面获取图片的地址
        // 有可能没有上传图片,又把之前的图片删掉了,比如就剩下一个了(原来,不是新的)
        imgUrl: item.response ? item.response.data : item.imgUrl,
      }))
      // 对销售属性的数据进行筛选
      spuInfo.spuSaleAttrList.filter((attr) => {
        // 用来存储销售属性值的数组--->是否有数据
        if (attr.spuSaleAttrValueList.length > 0) {
          // 干掉edit
          delete attr.edit
          // 干掉saleAttrValueName
          delete attr.saleAttrValueName
          return true
        }
        // 筛选没有属性值的属性
        return false
      })

      // 异步调用接口发送请求保存spuInfo
      const result = await this.$API.spu.addOrUpdateSpuInfo(spuInfo)
      if (result.code === 200) {
        // 提示
        this.$message.success('保存SPU成功')
        // 关闭当前界面
        this.$emit('update:visible', false)
        // 通知父级组件,重新更新一下数据,分发了父级组件的success事件
        this.$emit('success')
        // 重置当前组件中的一些数据
        this.resetData()
      } else {
        // 提示
        this.$message.error('保存SPU失败')
      }
    },

    // 重置数据操作的方法
    resetData() {
      this.spuId = null // 用来存储spuId数据的
      this.spuInfo = {} // 用来保存获取到的spu对象的数据
      this.spuImageList = [] // 用来存储spu对象对应的图片列表数组数据
      this.trademarkList = [] // 用来存储所有的品牌信息数据的数组
      this.saleAttrList = [] // 用来存储所有的销售属性列表数组数据
      // 上传图片组件需要的表达式
      this.dialogImageUrl = '' // 预览图片的地址
      this.dialogVisible = false // 是否展示预览的效果
      this.attrIdAttrName = '' // 用
    },

    // 返回按钮的点击事件----隐藏当前的SpuForm组件
    back() {
      // 不能够直接修改父级组件中isShowSpuForm表达式的值(不能控制当前的这个组件显示或者隐藏)
      // this.visible = false
      // 分发父级组件的update:visible事件
      this.$emit('update:visible', false)
      this.resetData() // 清空当前的数据
    },
  },
}
</script>
<style scoped>
</style>