<template>
  <div>
    <!--三级分类的-->
    <el-card style="margin-bottom:20px">
      <CategorySelector @changeCategory="changeCategory" />
    </el-card>
    <!--按钮和表格-->
    <el-card>
      <!--按钮和表格和分页-->
      <div v-show="!isShowSpuForm">
        <!--按钮-->
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px">添加SPU</el-button>
        <!--表格-->
        <el-table :data="spuList" border style="width: 100%;margin-bottom:20px">
          <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
          <el-table-column prop="spuName" label="SPU名称"></el-table-column>
          <el-table-column prop="description" label="SPU描述"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <!--添加SKU的按钮-->
              <HintButton title="添加SKU" type="primary" icon="el-icon-plus" size="mini" />
              <!--修改SPU的按钮-->
              <HintButton title="修改SPU" type="primary" icon="el-icon-edit" size="mini" @click="showUpdateSpu(row)" />
              <!--查看已有的SKU的按钮-->
              <HintButton title="查看已有的SKU" type="info" icon="el-icon-info" size="mini" />
              <!--删除SPU的按钮-->
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
        <el-pagination
          :current-page="page"
          :page-sizes="[3,6,9,12]"
          :page-size="limit"
          :total="total"
          layout="prev, pager, next, jumper,->, sizes,total "
          @size-change="handleSizeChange"
          @current-change="getSpuList"
          style="text-align:center"
          background
        ></el-pagination>
      </div>
      <!--修改Spu信息的组件-->
      <SpuForm :visible.sync="isShowSpuForm" ref="spuForm" @success="success" />

      <!--


        <子级组件 :属性名字="表达式" @update:属性名字="表达式=$event"  />
        简化:
         <子级组件 :属性名字.sync="表达式"  />
        子级组件内部 this.$emit('update:属性名字',值) 修改父级组件的表达式的值
      -->
    </el-card>
  </div>
</template>

<script>
import SpuForm from '../components/SpuForm'
export default {
  name: 'SpuList',
  data() {
    return {
      spuList: [], // spu列表信息数据数组
      page: 1, // 默认第一页
      limit: 3, // 每页显示多少条
      total: 0, // 总条数数据
      category1Id: '', // 一级分类的id
      category2Id: '', // 二级分类的id
      category3Id: '', // 三级分类的id
      isShowSpuForm: false , // 默认不显示修改spuForm界面,如果为true则显示了
    }
  },
  components: {
    SpuForm,
  },
  methods: {
    // 分类组件中,切换选择分类信息的时候,分发的自定义事件的回调函数
    changeCategory({ categoryId, categoryLevel }) {
      if (categoryLevel === 3) {
        // 三级id
        this.category3Id = categoryId
        // 调用接口,获取spu列表数据
        this.getSpuList()
      } else if (categoryLevel === 1) {
        // 一级id
        this.category1Id = categoryId
        // 清空二级分类的id和三级分类的id
        this.category2Id = null
        this.category3Id = null
        // 清空数组数据
        this.spuList = []
        // 清空总条数
        this.total = 0
      } else if (categoryLevel === 2) {
        // 二级id
        this.category2Id = categoryId
        // 清空三级的分类的id
        this.category3Id = null
        // 清空数组数据
        this.spuList = []
        // 清空总条数
        this.total = 0
      }
    },
    // 根据页码和每页的条数及三级分类的id获取spu列表信息数据
    async getSpuList(page = 1) {
      // 更新页码数
      this.page = page
      const { limit, category3Id } = this
      const result = await this.$API.spu.getSpuList(page, limit, category3Id)
      if (result.code === 200) {
        // 获取 spu数组数据和总条数
        const { records, total } = result.data
        // 更新spu数组数据操作
        this.spuList = records
        // 更新总条数
        this.total = total
      }
    },

    // 分页组件需要的 回调函数
    handleSizeChange(limit) {
      // 立刻更新每页的条数数据
      this.limit = limit
      // 立刻重新获取spu信息数据
      this.getSpuList()
    },
    // handleCurrentChange(page) {
    //   // 更新页码数
    //   this.page = page
    //   this.getSpuList(page)
    // },

    // 点击表格中的修改SPU按钮,显示SpuForm组件,同时传入spuInfo对象
    showUpdateSpu(spuInfo){
      this.isShowSpuForm = true // 展示SpuForm组件界面
      // 调用SpuForm组件中的initUpdateData()方法,并传入spuId数据
      this.$refs.spuForm.initUpdateData(spuInfo.id)
    },


    // 更新数据成功的自定义事件的回调函数
    success(){
      // 重新获取当前界面的数据
      this.getSpuList()
    }
  },
}
</script>
