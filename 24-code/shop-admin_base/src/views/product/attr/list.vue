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
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom:20px"
          @click="toAddAttr"
          :disabled="!category3Id"
        >添加属性</el-button>
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
              <el-popconfirm :title="`确定要删除 ${row.attrName} 吗`" @onConfirm="deleteAttr(row.id)">
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
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addValue"
            :disabled="!formAttr.attrName.trim()"
          >添加属性值</el-button>
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
                :ref="$index"
                type="text"
                v-if="row.edit"
                placeholder="输入属性值按enter确定"
                size="mini"
                v-model="row.valueName"
                @keyup.enter.native="toViewValue(row)"
                @blur="toViewValue(row)"
              />
              <!--当前这个数据不需要修改-->
              <span
                v-else
                @click="toEditValue(row)"
                style="display:inline-block;width:100%"
              >{{row.valueName}}</span>
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
        <el-button type="primary" @click="updateAttr" :disabled="!isSaveValid">保存</el-button>
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
  // 计算属性
  computed: {
    isSaveValid() {
      // return this.formAttr.attrName.trim()&&this.formAttr.attrValueList.length>0
      return (
        this.formAttr.attrName.trim() &&
        this.formAttr.attrValueList.some((item) => !!item.valueName.trim())
      )
    },
  },
  methods: {
    async getAttrList() {
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
    },
    // 保存当前的分类信息的id值,及调用接口发送请求获取 平台属性列表数据数组
    // categoryId参数: 一级id/二级id/三级id, categoryLevel参数:1/2/3
    // 只有是三级分类id的时候才调用接口发送请求,获取平台属性信息数据
    changeCategory({ categoryId, categoryLevel }) {
      if (categoryLevel === 3) {
        // 三级id
        this.category3Id = categoryId
        this.getAttrList()
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
      this.$nextTick(() => {
        // 直接设置该文本框获取焦点
        this.$refs[this.formAttr.attrValueList.length - 1].focus()
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
    // 点击span标签,进入到编辑模式
    toEditValue(value) {
      // 此时如果edit为true,说明此时显示文本框,那么就是编辑模式
      // value.edit = true
      // 添加属性值操作的时候,为当前的属性值对象添加了一个edit属性,目的是为了区别编辑模式还是查看模式
      // 一开始表格中遍历出来的数据,默认是没有edit属性的,只有后添加的数据才有的edit属性
      // this.formAttr.attrValueList数组中每个对象数据都是响应式的数据,edit是一个非响应式的属性,所以,该属性值如果变化,界面是不会重新渲染的
      // 先判断当前的这个属性值对象 中是否有有edit属性,如果没有,则添加一个响应式的属性,该值如果发生变化,界面也会渲染,如果属性对象中已经有了个这个属性,重新设置为true
      if (!value.hasOwnProperty('edit')) {
        // 默认添加一个,响应式
        this.$set(value, 'edit', true)
      } else {
        value.edit = true
      }
    },
    // 保存按钮的点击事件---更新平台属性的操作
    async updateAttr() {
      // 干掉属性值对象中的edit属性
      this.formAttr.attrValueList.forEach((value) => delete value.edit)
      // 收集数据
      // console.log(this.formAttr)
      // 调用接口
      const result = await this.$API.attr.addOrUpdateAttr(this.formAttr)
      // 判断成功还是失败
      if (result.code === 200) {
        // 提示信息
        this.$message.success(`${this.formAttr.id ? '更新' : '添加'}操作成功`)
        // 跳转到属性列表界面
        this.isShowAttr = true
        // 重新获取属性列表数据
        this.getAttrList()
      } else {
        // 提示信息
        this.$mssage.error(`${this.formAttr.id ? '更新' : '添加'}操作失败`)
      }
    },
    // 点击添加属性按钮----实现添加平台属性操作
    toAddAttr() {
      // 显示添加/修改平台属性的界面
      this.isShowAttr = false
      // 最终肯定是把数据保存到一个对象中
      this.formAttr = {
        attrName: '', // 属性名字
        attrValueList: [], // 属性值数组
        categoryId: this.category3Id, // 三级分类的id
        categoryLevel: 3, // 分类的级别
      }
    },
    // 删除某个平台属性操作
    async deleteAttr(attrId) {
      // 调用接口
      const result = await this.$API.attr.deleteAttr(attrId)
      if (result.code === 200) {
        // 提示信息
        this.$message.success('删除成功')
        // 重新获取数据
        this.getAttrList()
      } else {
        // 提示信息
        this.$message.error('删除失败')
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

