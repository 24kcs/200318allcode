/*

1. vue create gshop 下载项目
2. 设置package.json 文件中第16行---->  -- open 保证项目自动在浏览器中打开
3. 设置当前项目使用less的方式进行样式操作----需要安装less less-loader 插件
  <style lang="less" rel="stylesheet/less" scoped></style>

4. 要求: 项目中必须有注释.(项目中没有注释,遇到问题,不容易解决),公司中的项目经理如果看代码没有注释,骂人

5. 在src目录中新建一些目录(每个目录都有自己的作用)
api目录: 用来存放api接口函数及axios的二次封装的文件代码
components目录:用来存储全局公共组件及普通组件
mock目录:用来存放模拟数据的文件代码
pages目录:用来存储路由组件
router目录:路由器及路由的相关文件代码
store目录:vuex的相关文件及代码
utils目录:特殊的一些工具插件文件及代码
有经验的程序员:在项目搭建之初,快速的创建自己项目所需要的目录(分析,然后先创建一些自己需要的.)
无经验的程序员:在项目搭建之后,需要什么目录才创建对应的需要的目录


6. 当前项目需要很多组件进行数据的传递及路由的配置和后台的交互，已经less样式的设置
  安装相关的插件
  npm install vuex vue-router axios less less-loader

7. 分析项目,拆分组件
  Header头部
  Home----Search---Register----Login
  Footer底部
  ====================================
  每个组件应该有自己的目录(组件可能会用到相关的静态资源,如:图片),
  每个组件为了将来其他组件引入容易一些,组件的命名全都使用index.vue
  ========================================
  普通的组件----components目录中
  头部----Header组件
  底部----Footer组件
  路由组件-----pages目录中
  Home组件---->首页
  Search组件--->展示商品信息
  Register组件---->注册组件
  Login组件----->登录组件
  注册路由:Home,Search,Register,Login
  在main.js中配置一下路由器

  ----------------
  由于,在组件内部,经常涉及到引入其他目录中的组件或者文件,每次引入的时候都需要写相对路径(../)很麻烦,所以,设置一下
  需要在gshop根目录中创建一个jsconfig.json的文件,下面代码粘贴进去即可
  {
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
        "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}


8. 通过meta对象中设置属性,控制页面中的某个组件显示或者隐藏的操作


9. 路由跳转及参数的传递:
  1) 目前版本的路由通过编程式的方式进行跳转的时候,最好可以设置一个空成功回调或者失败的回调,或者使用.then()和.catch()解决路由的bug---解决问题的方式不适合大量的编程式路由
  2) 可以在声明使用路由插件之前,进行push方法和replace方法的重写操作,设置默认的成功空回调或者失败空回调---解决问题的方式适合大量的编程式路由
  3) 编程式路由在跳转的过程中可以使用params或者query的方式进行传参
    this.$router.push(`/search/${this.keyword}`)----params
    this.$router.push(`/search?keyword=${this.keyword}`)----query
  4) 编程式路由中无论是params还是query的方式进行路由的传参都可以使用对象的写法
      query的方式
      this.$router.push({ path: '/search', query: { keyword: this.keyword } })
      this.$router.push({ name: 'search', query: { keyword: this.keyword } })
      params的方式
      this.$router.push({ name: 'search', params: { keyword: this.keyword } })
    总结: query的方式以对象的写法进行传参,可以使用path也可以使用name
          params的方式以对象的写法进行传参,只能使用name的写法

10.拆分组件

11.api目录中
  index.js文件----封装api接口函数
  ajax.js文件---用来做axios二次封装(设置进度条,设置接口的基础路径,请求的超时时间,设置请求拦截器和响应拦截器...)
  如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
  跨域和代理的问题
  vue.config.js文件
  target: 'http://182.92.128.115/', // 目标服务器地址
  changeOrigin: true // 是否跨域

12. 脚手架3中eslint语法检查的设置
 package.json中 目前是41行中
  "rules": {} 一项一项的设置
 vue.config.js文件中
    lintOnSave: false, 



13.Vuex可以模块化的方式进行配置及使用
 每个模块的名字可以按照在哪个组件中使用数据的组件命名,也可以按照功能来命名,但是要有意义
 创建store对象的时候
  export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules
  })

    home就是modulesA模块的名字
    如何访问home模块中的状态数据
    this.$store.state.home.age---->组件中
    vuex一旦模块化之后,组件中获取该状态数据的时候,写法也会有一些变化
    原来写法:  computed:{...mapState(['age'])}
    有了模块化之后,状态数据在组件中如何获取
    现在的写法:computed:{ ...mapState({age:state=>state.home.age})}


14. 组件中遍历大量的标签,鼠标进入到很多的a标签中的高亮显示效果,出现了卡顿效果,需要解决
  函数的节流和函数的防抖(复习)----->

*/