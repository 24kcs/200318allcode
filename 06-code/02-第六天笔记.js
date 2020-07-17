/**
 * 
 * 
 * vue-router 案例 写一遍  18 个人
 * 
 * 选择1: 我继续讲  28人
 * 选择2: 先给大家练习,补上vue-router的代码(最低要写一遍)  13  自己抽时间补上
 * 
 * 
 * 男人不能说自己不行
 * 
 * 
 * 
 * 
 * 1. Vue版本的计数案例(引出Vuex)
 * 
 * 2. Vuex:是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
 * 
 *  Vuex:集中式的统一管理状态数据,可以实现任意组件通信
 *  state: 存放状态数据的
 *  mutations: 直接修改状态数据的
 *  actions: 间接修改状态数据
 *  getters: 存放状态数据相关的计算属性的get方法
 *  Vuex什么时候使用? 涉及到大量的状态数据需要管理的时候,涉及到多个状态数据多个组件进行通信
 *  面试题: 
 *  1.你们公司的这个项目为什么要使用Vuex?
 *  2.你们公司的这个项目为什么不使用Vuex?
 *  听老大的----->
 *  原本不用vuex,后来发现状态数据特别多,还涉及到很多组件要进行通信,后来才用的vuex
 * 
 * 
 * 
 * 
 * Vuex的使用步骤及说明
 * 1. npm install vuex --save 安装Vuex
 * 2. src目录中vuex目录或者store目录
 *  store目录中有index.js文件
 *  vuex目录中有store.js文件
 * 3. 在js文件中引入Vue,引入vuex,声明使用插件,实例化Vuex的store并暴露出去
 * 4. 在main.js中注册仓库store
 * 
 * 
 * Vuex中提供了四个辅助函数
 * 如果希望在组件的计算属性中获取状态数据或者vuex中的getters中的get的计算属性,可以使用mapState或者mapGetters
 * 如果希望在组件的methods中提交mutation或者提交action,此时可以使用mapMutations或者mapActions
 * mapState或者mapGetters中如果组件中的计算属性名字和vuex中的状态数据的属性名字或者和get的方法名字一致可以使用字符串数组形式,不一致可以使用对象
 * mapMutations和mapActions中的参数也可以是数组或者对象
 * 
 * 
 * 3. 分析Vue源码
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