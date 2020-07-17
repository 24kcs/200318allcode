// Vue中自定义插件的思路
(function (window) {
	// 插进一般都会暴露一个插件对象
	// 定义插件对象
	const MyPlugin = {}

	MyPlugin.install = function (Vue) {
		// 1. 添加全局方法或 property
		Vue.myGlobalMethod = function () {
			// 逻辑...
			console.log('我是一个全局方法')
		}
		// 2. 添加全局资源
		Vue.directive('my-directive', (el, binding) => {
			el.textContent = binding.value + '====哈哈'
		})
		// 3. 添加实例方法
		Vue.prototype.$myMethod = function (methodOptions) {
			// 逻辑...
			console.log('我是一个实例方法')
		}
	}
	// 暴露该对象
	window.MyPlugin = MyPlugin
})(window)