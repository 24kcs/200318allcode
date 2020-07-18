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
 *    本身通过脚手架运行的应用,会默认自动的启动一个服务器,当前浏览器的地址是:localhost:8080,但是要访问服务器的地址:http://182.92.128.115/,此时浏览器当中的地址和服务器的地址不在同一个主机上.
 *  官网文档说明:
 * 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
 * 通过代理的方式实现跨域(本地启动的服务器代理你要访问的api的地址,向后台的服务器发送请求)
 * 正向代理:代理了客户端
 * 反向代理:代理了服务器端
 * 面试题:说说你对正向代理和方向代理的理解
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
 */

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
  npm install vuex vue-router axios less less-loader nprogress(进度条的插件)

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


    声明式路由传参:<router-link to="/路径/参数值" /> params的方式
                  <router-link to="/路径?参数值" /> query的方式
                  <router-link :to="{path:'/地址',query:{id:10}}" /> query的对象方式
                  <router-link :to="{name:'名字',params:{id:20}}" /> params的对象方式

    编程式路由传参:this.$router.push('/路径/参数值') params的方式
                  this.$router.push('/路径?参数值') query的方式
                  this.$router.push({path:'/地址',query:{id:10}}) query的对象写法
                  this.$router.push({name:'名字',params:{id:20}}) params的对象写法

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
  函数的节流和防抖的代码面试的时候经常使用笔试手写代码的方式出现

  通过下载lodash js工具库,内部要有已经封装好了的 debounce和throttle函数
  默认lodash这个对象,用 _  来表示
  如: lodash.debounce() 正常应该是这么书写的,但是,现在这么写:  _.debounce()
  为了在项目中通过防抖或者节流的方式减少某些事件的频繁触发的操作,引入了lodash这个js工具库,该库中封装了大量的方法,但是,我仅仅为了一个问题,引入了这么大的一个js包,不太合理(项目上线,将来没有必要)
  按需引入来解决: 只引入需要的函数即可,没有必要全都引入进来(引入整个对象)


15. TypeNav组件中的mounted中 提交了action,获取分类信息的数据,每一次当前的这个组件只要加载完毕,就会提交action,发送请求,由于分类信息的数据,只需要一次,没有必要发送那么多的请求,可以把提交action的操作放在App.vue组件中使用,可以进行优化操作


16. 首页界面加载后,发送请求,获取轮播图的相关数据
暂时没有轮播图数据,需要自己设计
对象{}或者数组[]
mockjs---->生成随机数据,拦截ajax请求(必须手写代码的方式才能发送ajax请求)


17.组件中经常会涉及到异步请求后,获取vuex的状态数据,有的时候需要DOM更新后才进行一些相关的操作,如:swiper插件实现轮播图的效果,此时如果先创建了swiper对象,之后才获取轮播图的数据,界面中的轮播图效果很容易失效(没有效果)
解决:
  方式1:在mounted中使用定时器,不太合适,因为不确定合适可以获取数据后,立刻创建swiper对象
  方式2:通过watch进行数据的监视,然后创建swiper对象,也不太合适,因为,也不确定到底合适可以获取数据,更新dom,创建swiper对象
  方式3:使用Vue.nextTick()方法或者vm.$nextTick()方法
  将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。

18.mockjs的面试题: 通过Vue脚手架搭建一个登陆界面,实现登录操作,用户信息如下:用户名:admin,密码:888888,要求:自己通过mockjs的方式实现,登录成功后,显示:xxx公司欢迎您,登录失败则提示:帐号或者密码错误,可以继续登录,三次机会(输入帐号和密码三次,错误的情况),然后就不能再登录(锁上了)---自己搭建服务器


  19. 抽取Carousel轮播图组件,在ListContainer组件和Floor组件中使用出现了bug

     怀疑当前组件没有加载成功,所以,在mounted中进行测试,测试结果是执行了3次!
     为什么执行了3次? 当前的组件被使用了三次(ListContainer组件一次,Floor组件两次)
     怀疑Floor组件中使用Carousel组件的时候,传入的(轮播图)数据有问题,所以,打印carouselList数组的长度(个数)---- 0 , 3 3 浏览器显示的结果!
     分析:carouselList数组的长度 应该是: 4 , 3 , 3,为什么?
     原因:
     ListContainer组件使用Carousel组件的时候传入的数据banners数组中有4个数据,所以,第一次打印carouselList.length--->4个
     Floor组件遍历了两次,每一次遍历的时候,内部都使用了Carousel组件,并且传入了carouselList数组数据,该数组中有3个数据,所以,第二次和第三次打印carouselList.length--->都是---->3个
     所以,根据分析结果,得到结论: 4 ,3 ,3
     所以,测试:console.log('mounted----->',this.carouselList.length) 得到的结果:0,3,3
     问题:到底是分析出了问题还是浏览器出了问题?
     分析结果:4,3,3
     浏览器输出结果:0,3,3
     很明显:分析结果和浏览器的打印结果有问题,此时查看监视是最好的选择,通过查看监视,发现carouselList.length 打印结果是4,而且只执行1次,说明:carouselList数组的数据就发生了一次的变化
     此时:
     mounted中的代码什么时候执行? 如果当前组件被使用了(其他组件用到了该组件),而且该组件中的DOM已经全部的渲染完毕了(界面加载完毕了),那么此时mounted中的代码才会执行
     watch中的代码什么时候执行? 如果监视的数据发生了变化,此时才会执行watch中的代码(也就是说,如果监视的数据没有变化,那么就不会执行里面的代码)

     ListContainer组件中使用Carousel组件的时候,传入了一个数据banners给了carouselList,那么,mounted中代码执行的时候,说明界面已经加载完毕了,但是,后来carouselList肯定是发生了变化,也就是说,一开始的时候carouselList数组数据是空的,传过来的之后,数据由0个变成了4个,这个时候,watch中的代码就会立刻的执行,创建swiper对象,轮播图就有了效果
     为什么Carousel组件中的carouselList数组数据一开始是0呢?(本身使用的时候我已经直接传入了数据啊!)
     Floor组件使用Carousel还没分析呢!======================坑
     需要清楚当前的Carousel组件到底是怎么创建

     ListContainer组件中 :  <Carousel :carouselList="banners" />
     组件在使用的过程中,如果通过强制绑定数据的方式,向该组件内部传递数据,该传入的数据有值或者没有值,都不会影响该组件的创建,所以,该组件可以正常的渲染,正常的加载出来,既然如此,该组件的mounted中的代码会正常的执行


     Home组件中:  <Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
     组件在使用的过程中,如果通过v-for指令遍历数据的方式产生(创建)组件,并使用,有问题,v-for指令是一个条件,遍历的数组(对象)如果没有数据,叫做条件不满足,既然条件不满足,那么该组件无法创建
     Floor组件中:   <Carousel :carouselList="floor.carouselList" />
     所以,如果说Floor组件中的v-for指令遍历的floors数组没有数据,那么Floor组件就不会创建,如果不能创建,就是不能使用,既然不能使用,那么该组件中的界面就不会渲染,那么,mounted中的代码就不会执行



    大轮播图: 0 ----->4
    ListContainer组件中使用了<Carousel :carouselList="banners" /> 轮播图组件
    一开始的时候Home组件中的mounted中通过dispatch提交了action,目的是获取banners数据，但是毕竟是在mounted中执行的请求(action中发送的)的代码,此时这里的代码能够执行,是因为当前的Home组件中的子级组件已经全部的渲染完毕了(组件已经加载完毕了--->ListContainer组件---->Carousel组件),Carousel组件在渲染的时候,传入了banners数组数据,但是此时banners没有数据,因为没有发送请求呢,所以,此时Carousel组件可以正常的渲染,那么该组件中的mounted中的代码就会执行,此时内部的carouselList数组的数据是0个,但是组件已经加载完毕了,然后Home组件的mounted开始执行,内部发送请求,请求也需要时间,响应回来的数据也需要时间,有可能正好是在Carousel组件渲染完毕后的一刹那,此时请求的banners数据有了,那么也就意味着<Carousel :carouselList="banners" />传入了banners数据了,但是Carousel的mounted中的代码已经执行完毕了(就执行一次),所以,一开始在mounted中的输出的carousel.length的结果就是0,可是,由于banners数据已经有了---->就是数据发生了变化,只要数据发生了变化,那么就会立刻的进入到了watch中,就会创建swiper对象,此时页面中的大轮播图就有了效果了


     小轮播图：3 3
     一开始的时候Home组件中:<Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
     此时Home的mounted中的异步请求的代码还没有执行呢,页面没有加载完毕,执行到Floor组件的v-for指令的之后,悲剧了,floors没有数据,则,Floor组件不会创建,但是,代码会继续的向后执行,完毕后,mounted中的异步请求代码开始执行,发送请求,获取返回的数据,突然,响应的数据中floors数组有数据了,立刻,创建Floor组件,满足了v-for指令的条件,也就是floors数组中有两个对象,每个对象中都有一个属性carouselList,是个数组(有3个数据),Floor组件内部此时正好用到了:<Carousel :carouselList="floor.carouselList" />,而此时floor.carouselList数组中有数据(3个),此时Carousel组件可以渲染了(第一次渲染的时候就有数据),那么界面就加载了,mounted中的代码就会执行,所以,mounted中的carouselList.length的结果是3 该组件用了两次,所以,输出的两次结果都是3,但是啊,因为floor对象中的carouselList数组中的数据确实是3个,而且自始至终从来没有变化过,所以,不会执行watch中的代码,所以,不会创建swiper对象的,所以,轮播图没有效果

     至此: Carousel组件中mounted内部代码执行了3次, 0 , 3, 3
           Carousel组件中的watch内部代码只执行了1次, 4


    分析总结:
    组件在创建的过程中如果使用了强制数据绑定,那么该绑定的数据有无都不影响组件的创建
    组件在创建的过程中如果使用v-for指令,那么如果遍历的过程中不满足v-for指令的条件,则该组件不会被创建
    组件在创建的过程中,mounted中的代码只会执行一次,而且是在该组件加载完毕后才执行,
    组件中的watch中的代码执行也是有条件,条件:如果组件加载的过程中的数据发生了变化,那么才会执行
    该轮播图的bug就在于第一次使用该组件,内部传入的数组数据是0个,后来数组数据变化了,watch中的代码就会执行--->创建swiper对象
    该组件在Floor内部使用的时候,由于Floor组件使用的v-for指令,遍历数据的时候,不满足指令条件,该组件无法创建,后来有了数据,Floor组件创建,此时使用的轮播图组件直接传入了数组数据(有值),那么watch中的代码由于传入的数据的值没有变化过,所以,不会执行
    数据变化:一开始组件加载的时候,还没有发送请求,界面加载后发送的请求,也需要时间获取响应的数据,才造成的问题


    通过分析及代码执行的结果得到结论:
    大轮播图没有问题,因为数据变化,watch中的代码可以执行
    小轮播图有问题,因为数据没有变化,watch中的代码没有执行
    如何解决:设置watch中的代码一开始就执行一次

    原本watch就执行一次,现在执行了4次,不需要,执行3次就可以了

    面试题:说说你在开发项目中遇到了什么难点,怎么解决的?



20.路由已经跳转到search界面了，但是点击按钮(点击分类信息),路由不再跳转了(已经进入当前界面了,为什么还要再次跳转),这是bug,原因是:组件已经渲染完毕了,系统为了高效复用组件,觉得没有必要重新访问,再次创建组件
解决:监视$route对象,再做相关的操作



21.路由跳转:
bug1:
点击TypeNav组件中的分类信息,携带了query的参数,跳转到Search界面,此时如果点击Header组件内部的搜索按钮,并且文本框中有输入的关键字,此时跳转到Search界面,携带了params参数,浏览器的地址栏中原来携带的query参数被干掉了,只保留了params参数

   解决:在TypeNav组件内部,路由跳转的时候,没有考虑地址栏中的params参数(只有在路由地址中有params参数的时候,此时确实是在search界面)------>此时的路径如果是  '/search/xxx' 就需要考虑 params参数

  临时的小需求:先通过Header组件点击搜索按钮进入到Search界面,然后在TypeNav组件内部,分类信息点击,进行路由跳转,使用的是push的方式,此时如果进行回退操作,还是回到上一次的界面,我希望的是:直接回退到Home界面
  可以把push改成replace的方式

  
bug2:
如果点击Header组件内部的搜索按钮,并且文本框中有输入的关键字,此时跳转到Search界面,携带了params参数,此时,点击TypeNav组件中的分类信息,携带了query的参数,跳转到Search界面,浏览器的地址栏中原来携带的params参数被干掉了,只保留了query参数



22. 如果组件中data内部定义了一个数据,当前这个数据是响应式的数据,
响应式数据:数据的值如果发生了变化,页面也会跟着进行渲染
响应式数据:响应式的对象添加一个新属性,这个新的属性内部没有监视/劫持---->没有数据绑定---->该属性值发生变化,页面不会更新
Vue.set()方法和this.$set()方法一样,都可以为响应式对象添加响应式的属性---->界面会渲染
Vue.delete()方法和this.$delete()方法一样



23.Pagination组件---->分页组件---->已经定义完毕的,可以直接使用的
使用该组件的时候,需要先定义成一个全局的公共组件
在Search组件内部使用该组件的时候,需要传入一个对象:pageConfig对象,通过查看Pagination组件内部的props可以知道
pageConfig对象中的数据如下:
total: 0, // 总的数据的个数---Search界面中商品的数据总的条数
showPageNo: 5, // 连续的页码数---连续的按钮的数量
pageNo: 1, // 默认要显示第几页的数据,页码数
pageSize: 10 // 每一页中显示几条数据


自己设计分页组件,并且可以做到任何的组件调用该组件的时候,可以正常的使用
设计通用的组件的基本思路(面试题)
  1) 设计基本的界面的结构和布局
  2）设计当前组件内部的状态数据
    currentPage:当前的页码数 
  3) 设计当前组件需要接收哪些动态的属性数据(别人调用该组件,需要传递什么数据)
    pageConfig:{
      总的数据条数
      total:0
      连续的页码数
      showPageNo:5
      默认显示的页码数(默认显示第几页的数据)
      pageNo:1
      每页显示的数据条数
      pageSize:3
    }
  4)设计内部数据发生变化,可能会需要通知外部的父级组件,可以通过自定义事件或者属性中传入函数的方式--属性函数
    保存当前的页码数
    this.currentPage=page
    自定义事件的方式通知父级组件
    this.$emit('changeCurrentPage',page)


24. 问题:添加购物车的操作:
    成功的情况: 路由跳转并传递路由参数
    失败的情况: 提示错误信息
  解决:
    1. 回调函数
    组件中在dispatch的时候,可以指定一个回调函数,在异步的action中,子请求成功或者失败的时候调用该回调函数,并且传入对应的成功或者失败的提示信息,如果成功则是空字符串提示信息,如果是失败,则传入非空字符串提示信息,最终在回调函数执行的时候对传入进来的提示信息做判断,再继续后面的操作
    2. async-await来解决
    前提:async函数执行的返回值是一个promise对象
    promise成功的value:函数体执行没有错误,那么return的就是value(不能是失败的promise)
    promise失败的reason:函数体执行错误/抛出了error/返回一个失败promise
    store.dispatch('addToCart2',query)返回值是action函数的返回值
    1)在组件中正常的分发action
     this.$store.dispatch('addToCart2',query)返回值是action函数的返回值
    2)在异步action中,在请求成功或者失败后,会犯相关的errorMsg(可能有值也可能没有值)
     return result.code===200?'':result.message||'添加失败'
    3)在组件中,通过await来得到errorMsg,根据结果来做响应的处理

      
      




*/