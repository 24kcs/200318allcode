// element ui  的代码
import Vue from 'vue'
import {
  MessageBox,
  Message,
} from 'element-ui'

Vue.prototype.$msgbox = MessageBox // 消息弹出框对象  组件中 this.$msgBox 使用
Vue.prototype.$alert = MessageBox.alert // 可以直接弹出对话框 组件中 this.$alert() 使用
Vue.prototype.$message = Message // 提示消息的对象  组件中 this.$message 使用