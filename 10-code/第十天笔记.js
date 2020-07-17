/**
 * 
 * 1. stylus在vscode及开发中如何的使用
 *    小例子 感受一下stylus的神奇的魅力
 * 2. 脚手架2和脚手架3的区别
 * 3. 技术点:Vue中路由传参的不同方式
 * 4. 前台的电商项目(综合的技术能力)
 * 
 */

 
/**
 * 
 * 脚手架2的下载命令
 * npm install -g vue-cli
 * 脚手架3的下载命令
 * npm install -g @vue/cli
 * 注意:如果电脑中安装了脚手架2了,不能直接安装脚手架3,必须要先干掉电脑中脚手架2,然后再安装脚手架3
 * npm uninstall vue-cli -g 先干掉脚手架2
 * npm install -g @vue/cli  再安装脚手架3
 * 
 * 通过脚手架2下载模版的命令
 * vue init webpack app-client2
 * 通过脚手架3下载模版的命令
 * vue create app-client3
 * 注意: 我干掉了脚手架2,也安装了脚手架3,但是我就想通过脚手架2的命令下载模版怎么办
 * 先需要全局安装一个桥接工具  命令:  npm install -g @vue/cli-init
 * 至此: 电脑中有可以通过脚手架2的命令下载模版,页可以通过脚手架3的命令下载模版
 * 
 * 脚手架2 启动 的命令和 打包  打包命令
 *  npm start 
 *  npm run build 
 *  serve dist
 *  
 * 脚手架3 启动 的命令和 打包  打包命令
 * npm run serve
 * npm run build 
 * serve dist
 * 
 * 
 * 脚手架2和脚手架3的区别:
 * 1. 目录的文件个数不同
 * 2. 脚手架2中有static目录,用来存储静态资源的,脚手架3中没有这个目录,静态资源可以放在public目录中
 * 3. 在浏览器中自动打开的设置不同
 *    脚手架2在config目录中的index.js文件中18行的位置设置为true,则可以在浏览器中自动的打开
 *    脚手架3中需要在package.json中第6行位置,需要加个--open,即可在浏览器中自动的打开
 * 4. eslint的设置不同
 *    脚手架2中在.eslintignore文件中可以直接设置哪些文件不用eslint检查
 *    脚手架2中在.eslintrc.js文件中可以逐个设置eslint语法检查是否关闭
 *    脚手架3中可以在vue.config.js文件中通过lintOnSave设置布尔类型的值 进行eslint语法检查的设置
 *    vue.config.js文件需要手动的添加到根目录中
 * 5. main.js中的代码不同
 *    脚手架3中的代码和脚手架2的不一样
 * 6. 跨域配置的设置不同----
 * 
 * 
 * 在脚手架中如果想要使用stylus 书写样式,首先需要安装stylus的相关插件
 *  npm install stylus stylus-loader
 * 
 * 
 * 
 * 
 * 
 * 路由传参的方式:
 * 1.params的方式:
 *  在注册路由的时候,需要使用:进行占位,在组件内部可以通过$route路由信息对象.params.xxx的方式获取路由传递的参数数据
 *  如:注册路由的时候
 *   {path:'/about/:id',component:About}
 *   组件中如何获取参数数据
 *   $route.params.id 即可获取
 *  params的方式传参,很明显想要获取数据离不开路由信息对象$route(是需要当前组件实例对象来获取的this.$route.params.id)
 *  params的传参方式和组件的联系很密切----耦合度比较高
 * 
 * 2.query的方式:
 *  在注册路由的时候,是不需要进行占位的,组件内部可以通过$route路由信息对象.query.xxx的方式获取路由传递的参数数据
 *  如: 注册路由和平时一样
 *   {path:'/about',component:About}
 *  组件中如何获取参数数据
 *  $route.query.id 即可获取
 *  query的方式传参,很明显想要获取数据离不开路由信息对象$route(是需要当前组件实例对象来获取的this.$route.query.id)
 *  query的传参方式和组件的联系也很密切---耦合度比较高
 * 
 * 3.meta的方式:
 *  在注册路由的时候,需要在组件内部设置meta对象,内部可以书写任何的键值对,组件内部可以通过$route路由信息对象.meta.xxx的方式获取路由传递的参数数据
 *  如:{path:'/about',component:About,meta:{showMsg:true}}
 *  组件中如何获取参数数据
 *  $route.meta.showMsg 即可获取
 * meta的方式传参,很明显想要获取数据离不开路由信息对象$route(是需要当前组件实例对象来获取的this.$route.meta.xxx)
 * meta的传参方式和组件的联系也很密切---耦合度比较高
 * 
 * 总结:params传参和query方式传参和meta方式传参,和组件的耦合度都是很高(以上三种方式传参及获取,离不开组件对象),但是不是很灵活.(组件和$route的关系很密切,高度耦合)
 * props的方式让组件和$route的关系不那么密切了,解耦
 * 
 * 
 * 4.props的方式:
 *  布尔模式: 先在注册路由的时候,使用props并设置为true,则需要在组件内部通过props的方式接收参数,即可使用传递的参数数据
 * 如: {path:'/about/:id',component:About,props:true}
 * 组件内部:props:['id'] 直接可以使用id来获取参数数据
 * 可以不用$route,此时的组件和$route进行了解耦
 * 
 *  对象模式: 先在注册路由的时候,使用props的对象的方式,则需要在组件内部通过props的方式接收参数,即可使用传递的参数数据
 * 如: {path:'/about/:id',component:About,props:{msg:'真香'}}
 * 组件内部:props:['msg'] 直接可以使用msg来获取参数数据
 * 可以不用$route,此时的组件和$route进行了解耦
 * 
 *  函数模式:先在注册路由的时候,使用props的函数模式的方式,则需要在组件内部通过props的方式接收参数,即可使用传递的参数数据
 * 如: {path:'/about',component:About,props:route=>({txt:'真好'})}
 * 组件内部:props:['txt'] 直接可以使用txt来获取参数数据
 * 可以不用$route,此时的组件和$route进行了解耦
 * 
 * 总结:
 *  路由传参,可以使用params的方式,也可以使用query的方式,还可以使用meta的方式,都可以使用props的方式进行解耦操作
 * 
 * 
 *  
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */