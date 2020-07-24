// 引入Vue
import Vue from 'vue'
// 引入插件
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// 声明使用插件
Vue.use(VeeValidate)
// 下面的配置,设置表单验证的时候,提示信息是中文
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages, // 中文提示
  // 属性的相关设置
  attributes: {
    mobile: '手机号码',
    code: '图形码',
    password: '密码',
    password2: '确认密码'
  }
})
// 增加一个验证手机号码的规则
VeeValidate.Validator.extend('phone', {
  // 这个扩展的验证的提示信息
  getMessage: field => `请输入正确的` + field,
  validate: value => (/^[1]\d{10}$/.test(value))
})
// 增加一个验证图形码的规则
VeeValidate.Validator.extend('changeCode', {
  // 这个扩展的验证的提示信息
  getMessage: field => `请输入正确的` + field,
  validate: value => (/^\d{4}$/.test(value))
})