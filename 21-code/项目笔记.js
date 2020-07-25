/*
项目: vue-element-admin 模版 + element-ui 组件库 +axios + vuex
项目二次开发: 思路(套路)
   开发的流程思路(后台的电商管理项目):
      1. 测试接口swagger
      2. 封装api接口函数
      3. 组件中调用api接口函数进行数据测试
      4. 组件中展示数据及实现功能(调用api接口)
    复习:前台的电商项目
      1. 测试接口postMan
      2. 封装api接口函数
      3. 封装vuex
      4. 组件中调用api接口函数进行数据测试
      5. 组件中展示数据及实现功能(调用api接口)

1. 目录的认识src目录中
  1) api目录-----api接口函数(封装)
  2）assets目录---静态资源
  3) components目录---普通组件的目录
  4) icons目录---图标的目录
  5) layout目录---整体结构布局的目录
  6) router目录---路由相关的目录
  7) store目录----vuex相关的
  8) styles目录---样式文件目录
  9) test目录---复习导入和导出的
  10) utils目录---工具对象或者是工具的函数的目录(ajax的封装,表单的验证...等等)
     request.js文件,内部做了二次封装axios的操作(设置了基础的路径,超时的时间,请求头,请求拦截器和响应拦截器)
  11) views目录(相当于pages目录)-----路由组件

2.需要对商品管理模块进行开发,内部的平台属性菜单,点击的时候报错,需要修改views目录中product目录中的prop目录名字,改为attr即可

3. 品牌管理模块
   swagger 在线测试接口的工具
   element-ui 组件库
   Button组件/Table组件/Upload组件/Pagination分页组件/Form表单组件/Input组件/Dialog对话框组件

*/