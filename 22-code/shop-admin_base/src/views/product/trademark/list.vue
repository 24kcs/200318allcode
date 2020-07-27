<template>
  <div>
    <!--添加按钮-->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom:20px"
      @click="ShowAddTrademark"
    >添加</el-button>
    <!--表格,stripe带有斑马纹的效果-->
    <el-table
      v-loading="loading"
      :data="trademarks"
      stripe
      style="width: 100%;margin-bottom:20px"
      border
    >
      <!--序号-->
      <el-table-column label="序号" align="center" type="index" width="80"></el-table-column>
      <!--名称-->
      <el-table-column prop="tmName" label="品牌名称"></el-table-column>
      <!--图片-->
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <!--图片标签-->
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" alt="logo" width="100" height="60" />
        </template>
      </el-table-column>
      <!--操作-->
      <el-table-column prop="address" label="操作">
        <!--template:模版 slot-scope:作用域插槽,scope:对象
        scope：对象
        scope.row:当前这一行的对象:品牌信息对象(trademarks是数组,数组内部每个数据都是一个品牌信息对象)
        scope.$index:当前的索引值,当前这一行的索引
        -->
        <template slot-scope="scope">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="small"
            @click="showUpdateTrademark(scope.row)"
          >修改</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="deleteTrademark(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件的使用-->
    <!--
        :current-page="page" 当前第几页的数据
        :page-sizes="[3,6,9,12]" 每页可以显示多少条数据
        :page-size="100" 每页显示多少条数据
        :total="400" 一共有多少条数据
  
  总条数     每页可以显示的条数    上一页     页码数     下一页    去第几页
  total,      sizes,             prev,      pager,     next,    jumper
    -->
    <el-pagination
      :current-page="page"
      :page-sizes="[3,6,9,12]"
      :page-size="limit"
      :total="total"
      layout="prev, pager, next, jumper,->, sizes,total "
      @size-change="handleSizeChange"
      @current-change="getTrademarkList"
      style="text-align:center"
      background
    ></el-pagination>

    <!--对话框的结构-->
    <!-- <el-dialog title="添加" :visible="isShowDialog" :before-close="()=>isShowDialog = false"> -->
       <el-dialog title="添加" :visible.sync="isShowDialog" >
      <el-form :model="form" style="width:80%" :rules="rules" ref="trademarkForm">
        <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
          <el-input v-model="form.tmName" autocomplete="off" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" :label-width="formLabelWidth" prop="logoUrl">
          <!--可以上传图片的东西-->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <!--如果上传图片成功了,那么就会显示出来-->
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTrademark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TrademarkList',
  data() {
    return {
      trademarks: [], // 用来存储品牌信息数组数据的
      page: 1, // 页码数(默认第一页)
      limit: 3, // 每页的条数
      total: 0, // 总条数
      // 对话框中需要用到的相关数据
      isShowDialog: false, // 设置当前的对话框显示或者隐藏
      form: {
        tmName: '', // 品牌的名字
        logoUrl: '', // 品牌的Logo
      },
      formLabelWidth: '100px', // 设置当前的标题的宽度
      loading: false, // 默认没有加载的效果

      // 表演校验的规则
      rules: {
        tmName: [
          // 必须有内容, 提示信息, 触发什么事件后就开始进行表单的校验
          { required: true, message: '请输入活动名称' },
          // 最少输入几个字符串
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'change',
          },
        ],
        logoUrl: [{ required: true, message: '请上传图片', trigger: 'change' }],
      },
    }
  },
  // 界面加载后的生命周期回调
  mounted() {
    // 获取品牌信息数据列表
    this.getTrademarkList()
  },
  methods: {
    // 获取品牌信息列表数据的方法
    async getTrademarkList(page = 1) {
      // 设置加载的效果出现
      this.loading = true
      // 更新页码数
      this.page = page
      // 调用接口,异步发送请求获取数据
      const result = await this.$API.trademark.getTrademarkList(
        this.page,
        this.limit
      )
      // 隐藏加载的效果
      this.loading = false
      if (result.code === 200) {
        // 请求成功了,获取内部的品牌信息列表数据----数组,更新总的条数数据
        // 获取品牌列表数组数据,总条数
        const { records, total } = result.data
        // 更新数据
        this.trademarks = records
        this.total = total
      } else {
        // 失败了,提示信息
        this.$message.error('抱歉,获取品牌信息失败')
      }
    },

    // 分页组件需要使用的两个回调函数
    // 当每页的显示条数发生了变化后,则执行该回调函数
    handleSizeChange(limit) {
      // 立刻更新每页的条数数据
      this.limit = limit
      // 立刻重新获取品牌信息数据
      this.getTrademarkList()
    },
    // handleCurrentChange(page) {
    //  // 更新页码数
    //  // this.page = page
    //  // 立刻重新获取品牌信息数据
    //   this.getTrademarkList(page)
    // },

    // 上传图片的组件需要的回调函数
    // 图片上传成功了,就会自动的执行该回调函数
    // res---response---->响应回来的对象,
    handleAvatarSuccess(res, file) {
      // console.log(res)
      // res.data------->可以获取上传图片成功后的地址
      // 更新上传图片成功后的地址
      this.form.logoUrl = res.data
      // 立刻清理表单校验的提示信息
      this.$refs.trademarkForm.clearValidate('logoUrl')
    },
    // 上传图片成功之前,对该图片进行一些限制的回调函数
    beforeAvatarUpload(file) {
      // 限制图片的类型的
      // const isJPG = file.type === 'image/jpeg'
      // 上传的图片必须是该数组中限定的类型
      const isJPG = ['image/jpeg', 'image/png'].includes(file.type)
      // 图片的大小  要小于  2M
      const isLt2M = file.size / 1024 / 1024 < 2
      // 如果不符合该图片限制的类型则提示
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      // 如果上传的图片的大小不符合限制 则提示
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      // 如果都满足上面的条件则返回true,则可以正常的上传图片
      return isJPG && isLt2M
    },
    // 添加/修改品牌操作的回调函数=====================
    addOrUpdateTrademark() {
      // 校验数据----表单的验证
      this.$refs.trademarkForm.validate(async (valid) => {
        // 此时说明表单校验成功了
        if (valid) {
          // 获取品牌的信息数据对象
          const { form } = this
          let result
          // 判断当前的id是否存在
          if (form.id) {
            // 修改
            result = await this.$API.trademark.updateTrademark(form)
          } else {
            // 添加
            result = await this.$API.trademark.addTrademark(form)
          }
          // // 判断是否成功,做不同的操作
          if (result.code === 200) {
            // 提示成功信息
            this.$message.success(`${form.id ? '修改' : '添加'}品牌成功了`)
            // 关闭界面
            this.isShowDialog = false
            // 重新获取品牌信息数据
            this.getTrademarkList(form.id ? this.page : 1)
          } else {
            // 提示失败信息
            this.$message.error(`${form.id ? '修改' : '添加'}品牌失败了`)
          }
        }
      })
    },
    // 点击添加按钮的回调函数(显示添加品牌对话框的操作)
    ShowAddTrademark() {
      // 清空品牌的名称和品牌的图片地址
      this.form = {
        tmName: '', // 清空品牌的名字
        logoUrl: '', // 清空品牌的Logo
      }
      // 显示对话
      this.isShowDialog = true
      // 此时这个界面还没有更新,Dialog组件对象还没有产生,Form组件对象也没有创建呢,所以,应该在Dorm组件出现后(渲染后)再清空里面的校验信息
      // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
      this.$nextTick(() => {
        // 校验表单的提示信息清空---清空所有的
        this.$refs.trademarkForm.clearValidate()
      })
    },

    // 点击修改按钮的回调函数(显示更新品牌对话框的操作)
    showUpdateTrademark(trademark) {
      // 把品牌信息对象的数据给form对象即可
      // 地址相同,指向同一块空间,在修改的对话框中修改数据,直接影响表格列表中的数据
      // this.form = trademark
      // trademark对象中的数据还是需要早form对象中使用的
      this.form = { ...trademark }
      // 显示对话框
      this.isShowDialog = true
    },

    // 删除品牌信息的操作的回调函数
    deleteTrademark(trademark) {
      // 删除是需要根据id的,弹出来的提示框是需要品牌名字
      this.$confirm(`确定要删除 ${trademark.tmName} 吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          // 此时点击的是确定按钮
          // 调用接口
          const result = await this.$API.trademark.deleteTrademark(trademark.id)
          if (result.code === 200) {
            // 删除成功的提示信息
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            // 如果说当前这一页中只有一个数据,删除了,那么这种情况,应该显示上一页的所有的数据
            // this.getTrademarkList(this.page)
            this.getTrademarkList(
              this.trademarks.length === 1 ? this.page - 1 : this.page
            )
          } else {
            // 删除失败的提示信息
            this.$message({
              type: 'error',
              message: '删除失败!',
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
body {
  margin: 0;
}
</style>
