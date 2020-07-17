<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <!-- <a href="###">登录</a>
            <a href="###" class="register">免费注册</a>-->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt />
        </a>-->
        <router-link class="logo" to="/">
          <img src="./images/logo.png" alt />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      keyword: '' // 获取文本框中输入的搜索关键字
    }
  },
  methods: {
    // 点击按钮跳转到Search界面
    toSearch() {
      // this.$router.push('/search')
      // const result = this.$router.push('/search')
      // console.log(result)
      // 路由的bug,在跳转的时候传入一个空的成功回调函数---相对是简单的
      // this.$router.push('/search',()=>{})
      // 在跳转的时候传入一个空的失败的回调函数
      // this.$router.push('/search',undefined,()=>{})
      // 在跳转的时候传入一个空的回调和失败的回调
      // this.$router.push( '/search',() => {}, () => {})
      // 通过.then和.catch的方式可以解决
      // this.$router.push( '/search').then(()=>{}).catch(()=>{})
      // 通过.catch的方式也可以解决
      // this.$router.push( '/search').catch(()=>{})
      // 路由跳转
      // this.$router.push('/search')
      // 编程式路由跳转进行参数的传递(params的方式,没有参数也可以进行跳转,query的方式)
      // params的方式传参
      // this.$router.push(`/search/${this.keyword}`)
      // query的方式传参
      // this.$router.push(`/search?keyword=${this.keyword}`)
      // 编程式路由跳转或者声明式路由跳转,其实都可以  以 对象的方式进行参数的传递
      // query的方式以对象的写法进行路由跳转的时候参数的传递
      // this.$router.push({ path: '/search', query: { keyword: this.keyword } })
      // this.$router.push({ name: 'search', query: { keyword: this.keyword } })
      // params的方式以对象的写法进行路由跳转的时候参数的传递(此时不能使用path)
      // this.$router.push({ name: 'search', params: { keyword: this.keyword } })
      // 判断文本框中是否有输入的关键字
      if (this.keyword) {
        this.$router.push({ name: 'search', params: { keyword: this.keyword } })
      } else {
        this.$router.push({ name: 'search' })
      }

     
    }
  }
}


// function Person(){}
// Person.prototype.sayHi=function(){}
// const per = new Person(){}
// per.sayHi()
// const mySayHi= Person.prototype.sayHi
// Person.prototype.sayHi =function (){
//   return mySayHi.call(this)
// }
// per的__proto__指向的显示原型prototype上

</script>
<style lang="less" rel="stylesheet/less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .loginList {
        float: left;
        p {
          float: left;
          margin-right: 10px;
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }
      .typeList {
        float: right;
        a {
          padding: 0 10px;
          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .logoArea {
      float: left;
      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }
    .searchArea {
      float: right;
      margin-top: 35px;
      .searchForm {
        overflow: hidden;
        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;
          &:focus {
            outline: none;
          }
        }
        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>