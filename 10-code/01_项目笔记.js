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



*/