<template>
  <!-- 注册内容 -->
  <div class="register">
    <h3>
      注册新用户
      <span class="go">
        我有账号，去
        <!-- <a href="login.html" target="_blank">登陆</a> -->
        <router-link to="/login">登录</router-link>
      </span>
    </h3>
    <div class="content">
      <label>手机号:</label>
      <input
        type="text"
        placeholder="请输入你的手机号"
        v-model="mobile"
        name="mobile"
        v-validate="'required|phone'"
      />
      <span style="color:red">{{errors.first('mobile')}}</span>
    </div>
    <div class="content">
      <label>验证码:</label>
      <input
        type="text"
        placeholder="请输入验证码"
        v-model="code"
        name="code"
        v-validate="'required|changeCode'"
      />
      <img ref="code" src="/api/user/passport/code" alt="code" @click="updateCode" />
      <!-- <img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code" @click="updateCode" /> -->
      <span style="color:red">{{errors.first('code')}}</span>
    </div>
    <div class="content">
      <label>登录密码:</label>
      <input
        type="text"
        placeholder="请输入你的登录密码"
        v-model="password"
        name="password"
        v-validate="'required'"
      />
      <span style="color:red">{{errors.first('password')}}</span>
    </div>
    <div class="content">
      <label>确认密码:</label>
      <input
        type="text"
        placeholder="请输入确认密码"
        v-model="password2"
        name="password2"
        v-validate="'required'"
      />
      <span style="color:red">{{errors.first('password2')}}</span>
    </div>
    <div class="controls">
      <input name="m1" type="checkbox" v-model="isAgree" />
      <span>同意协议并注册《尚品汇用户协议》</span>
    </div>
    <div class="btn">
      <a href="javascript:" @click="register">完成注册</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data() {
    return {
      mobile: '19876568743', // 手机号
      password: '123456', // 密码
      password2: '123456', // 确认密码
      code: '', // 图形验证码
      isAgree: true // 是否同意协议
    }
  },
  methods: {
    // 注册的回调函数
    async register() {
      // 收集数据
      const { mobile, password, password2, code, isAgree } = this
      // 判断操作,是否同意
      if (!isAgree) return
      // 判断密码和确认密码是否一致
      if (password !== password2) {
        alert('两次密码不一致')
        return
      }
      // 获取要校验的字段(表单标签中的name属性的值)
      const names = ['mobile','code','password','password2']
      // 校验所有的表单,验证是否都通过了
      const success = await this.$validator.validateAll(names)
      if (success) {
        // 分发action,调用接口,跳转操作---->登录界面
        try {
          await this.$store.dispatch('register', { mobile, password, code })
          // 成功则跳转到登录界面
          this.$router.replace('/login')
        } catch (error) {
          alert(error)
        }
      }
    },
    // 更新图形验证码
    updateCode() {
      // 自己加一个参数,改变了访问接口的地址,地址不同,就可以重新的刷新图形码
      this.$refs.code.src = '/api/user/passport/code?time=' + Date.now()
    }

    //  updateCode() {
    //   // 自己加一个参数,改变了访问接口的地址,地址不同,就可以重新的刷新图形码
    //   this.$refs.code.src = 'http://182.92.128.115/api/user/passport/code'
    // }
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;
  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;
    span {
      font-size: 14px;
      float: right;
      a {
        color: #e1251b;
      }
    }
  }
  div:nth-of-type(1) {
    margin-top: 40px;
  }
  .content {
    // text-align: center;
    padding-left: 390px;
    margin-bottom: 18px;
    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }
    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }
    img {
      vertical-align: sub;
    }
  }
  .controls {
    text-align: center;
    input {
      vertical-align: middle;
    }
  }
  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;
    a {
      text-decoration: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>