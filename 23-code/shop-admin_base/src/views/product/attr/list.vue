<template>
  <div>
    <!--三级分类的-->
    <el-card style="margin-bottom:20px">
      <CategorySelector @changeCategory="changeCategory" />
    </el-card>
    <!--按钮和表格-->
    <el-card>
      <!--展示平台属性列表的界面-->
      <div v-show="isShowAttr">
        <!--按钮-->
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px">添加属性</el-button>
        <!--表格-->
        <el-table :data="attrList" border style="width: 100%">
          <el-table-column type="index" width="100" label="序号" align="center"></el-table-column>
          <el-table-column prop="attrName" label="名称" width="200"></el-table-column>
          <el-table-column label="属性值列表">
            <template slot-scope="{row,$index}">
              <el-tag
                type="info"
                v-for="(value,index) in row.attrValueList"
                :key="value.id"
              >{{value.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{row,$index}">
              <HintButton
                title="修改"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="toUpdateAttr(row)"
              />
              <HintButton title="删除" type="danger" icon="el-icon-delete" size="mini" />
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--修改平台属性的界面-->
      <div v-show="!isShowAttr">
        <!--form表单-->
        <el-form :model="formAttr" inline>
          <el-form-item label="属性名称">
            <el-input v-model="formAttr.attrName"></el-input>
          </el-form-item>
        </el-form>
        <!--添加属性值按钮和取消按钮-->
        <div style="margin-bottom:20px">
          <el-button type="primary" icon="el-icon-plus" @click="addValue">添加属性值</el-button>
          <el-button @click="isShowAttr=true">取消</el-button>
        </div>
        <!--平台属性值的表格-->
        <el-table :data="formAttr.attrValueList" border style="width: 100%;margin-bottom:20px">
          <el-table-column type="index" width="100" label="序号" align="center"></el-table-column>
          <el-table-column label="属性值名称" prop="valueName">
            <!--如果是查看效果,那么显示的是span标签中的内容,如果是编辑模式,此时显示的是input文本框-->
            <template slot-scope="{row,$index}">
              <!--当前这个数据需要修改,进入编辑模式,组件中使用了keyup的自定义事件,也使用了blur自定义事件-->
              <el-input
                type="text"
                v-if="row.edit"
                placeholder="输入属性值按enter确定"
                size="mini"
                v-model="row.valueName"
                @keyup.enter.native="toViewValue(row)"
                @blur="toViewValue(row)"
              />
              <!--当前这个数据不需要修改-->
              <span v-else>{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <el-popconfirm
                :title="`确定要删除属性值 ${row.valueName} 吗`"
                @onConfirm="deleteValueName($index)"
              >
                <HintButton
                  slot="reference"
                  title="删除"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowAttr=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入深拷贝的方法---按需引入
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'PropList',
  data() {
    return {
      category1Id: '', // 一级分类的id
      category2Id: '', // 二级分类的id
      category3Id: '', // 三级分类的id
      attrList: [], // 平台属性列表数据数组
      isShowAttr: true, // 默认是true,显示平台属性表格的界面,如果为false,则修改平台属性界面隐藏
      // 用来绑定form表单标签的
      formAttr: {
        attrName: '', // 存储的是平台属性的名字
        attrValueList: [], // 平台属性值数组
      },
    }
  },
  methods: {
    // 保存当前的分类信息的id值,及调用接口发送请求获取 平台属性列表数据数组
    // categoryId参数: 一级id/二级id/三级id, categoryLevel参数:1/2/3
    // 只有是三级分类id的时候才调用接口发送请求,获取平台属性信息数据
    async changeCategory({ categoryId, categoryLevel }) {
      if (categoryLevel === 3) {
        // 三级id
        this.category3Id = categoryId
        // 调用api接口获取平台属性数据信息
        const result = await this.$API.attr.getAttrList(
          this.category1Id,
          this.category2Id,
          this.category3Id
        )
        // 判断是否成功
        if (result.code === 200) {
          // 立刻更新attrList数组数据
          this.attrList = result.data
        }
        // 调用接口发送请求
      } else if (categoryLevel === 1) {
        // 一级id
        this.category1Id = categoryId
        // 清空二级分类的id和三级分类的id
        this.category2Id = null
        this.category3Id = null
        // 清空数组数据
        this.attrList = []
      } else if (categoryLevel === 2) {
        // 二级id
        this.category2Id = categoryId
        // 清空三级的分类的id
        this.category3Id = null
        // 清空数组数据
        this.attrList = []
      }
      // 输出id和级别
      // console.log(categoryId, categoryLevel)
    },
    // 点击修改按钮,显示平台属性值列表修改的这个界面
    toUpdateAttr(formAttr) {
      // 把当前这一行的平台属性对象保存到formAttr对象中
      // 下面的方式,因为两个对象的指向是相同的,其中一个对象的数据发生变化,另一个对象的数据会自动变化
      // this.formAttr = formAttr
      // 浅拷贝导致的,还是有bug(尤其是内部的数据还是对象或者还是数组的情况下)
      // this.formAttr = {...formAttr}
      // 深拷贝的方式来解决
      this.formAttr = cloneDeep(formAttr)
      // 设置平台属性修改界面展示
      this.isShowAttr = false
    },
    // 删除某个属性值的操作
    deleteValueName(index) {
      // 移除平台属性值数组中的数据,根据索引的方式
      this.formAttr.attrValueList.splice(index, 1)
    },
    // 添加属性值的操作
    addValue() {
      // 向平台属性值列表数组中添加一个平台属性的值操作
      this.formAttr.attrValueList.push({
        valueName: '', // 属性值的名字
        attrId: this.formAttr.id, // 当前的平台属性值需要的 平台属相对象的id
        edit: true, // 标识,代表的是当前的属性值对象中的数据要进行编辑的操作
      })
    },
    // 按下回车后,进入到查看模式
    toViewValue(value) {
      // 判断该对象中是否有数据
      if (value.valueName) {
        // 进入到查看模式
        value.edit = false
      }
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

