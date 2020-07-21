// vue.config.js
module.exports = {
  lintOnSave: false, // 关闭了eslint语法检查
  // 服务器的配置---跨域的操作
  devServer: {
    proxy: {
      '/api': {
        target: 'http://182.92.128.115/', // 目标服务器地址
        changeOrigin: true // 是否跨域
      }
    }
  }
}