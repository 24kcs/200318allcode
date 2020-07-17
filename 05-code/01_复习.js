/**
 * 
 * 组件的关系:父子关系(直接/间接),兄弟关系
 * 
 * 
 * 组件通信:组件和组件之间的进行数据的传递
 * 
 * 
 * 组件之间通信的基本方式:
 * 1. props:父子组件之间通信,配合强制数据绑定一起使用,(属性中存储动态的数据,动态的数据可以是属性,也可以是函数,也可以是对象)
 * 2. 自定义事件:该事件并不是系统自带的事件,是自己定义的事件,如果是自己定义的事件,该事件是需要自己手动触发的
 * 按钮,添加一个click事件(中有回调函数)---系统自带的,
 * 按钮,添加了一个自定义的事件(中有回调函数)---自己定义的---需要手动的触发该事件,回调函数的代码才可以执行
 * vm.$emit(事件名字,参数)   事件名字--->对应的回调函数(参数)
 * this----->当前的组件的实例对象---->直接或者间接的继承自Vue的实例对象的
 * this.$emit('addTodo',todo)
 * 
 *   自定义事件可以实现父子组件之间的通信
 * 3. PubSub:是一个独立的插件,不属于Vue,但是,可以在Vue中使用
 *   实现任意组件之间直接进行通信
 * 4. 事件总线:
 *  在某个对象上,封装一个属性(该属性和事件有关系),该对象的所有的实例对象都可以访问 该属性进行一些事件的操作
 *  vm.$on()--->绑定事件
 *  vm.$emit()--->分发的事件
 *  vm.$off()---干掉事件---移除事件
 * vm---->Vue的实例对象--->组件也是对象,每个组件对象中都有一个this,this是当前组件实例对象
 * 所有组件的类型都是:VueComponent--->构造函数--->对象 对象的实例对象就是this
 *  组件中的this 可以直接使用$on,也可以直接使用$emit
 * 不同的组件中调用$on或者$emit() 只能在自己的组件中 绑定事件或者分发事件,不能在其他的组件中分发
 * A组件通过this.$on()绑定了事件del,B组件通过this.$emit()不能分发事件del
 *  
 * 
 * 事件总线:任意组件之间可以进行通信,任意组件绑定某个事件,任意组件都可以分发当前的这个事件
 * 
 * 
 * 
 * Header 组件 是对象
 * Header组件中的this 是当前这个组件的实例对象
 * 
 * 
 * 
 * 
 *  vm.$once()-----只触发一次事件----了解即可
 * 
 * 5. 插槽----占位,在需要的位置通过slot进行占位操作,需要使用的时候,直接插进去
 *  普通插槽之具名插槽(命名插槽)---
 * 命名插槽: slot就是插槽,如果插槽有名字(name属性)---就叫命名插槽,用来占位,动态的使用一些组件或者标签
 *  作用域插槽---->项目中讲解
 * 
 * 
 * 6. Vuex(Vue的基础的课程的第五天左右)
 * 
 * 组件: 具有特定功能效果的集合
 * 组件化: 拆分多个组件,每个组件都是一个对象
 * 模块: 单独的一个js文件(封装了js对象了)
 * 模块化:拆分多个模块,每个模块都是个js文件
 * 
 * 
 * 
 * 组件之间通信的高级方式(项目中讲解):
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