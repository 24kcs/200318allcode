/**
 * 
 * 自己实现事件总线的相关方法
 * 事件总线是一个对象---EventBus
 * EventBus.on(eventName,listener)----绑定事件
 * EventBus.emit(eventName,data)----分发事件
 * EventBus.off(eventName)----解绑事件
 * eventName--->事件类型---->事件名字
 * listener---->事件监听----->回调函数
 * data------->事件对应的回调函数中的参数数据
 * 
 * 调用的例子
 * EventBus.on('add',f1)
 * EventBus.on('add',f2)
 * EventBus.on('add',f3)
 * EventBus.on('del',f4)
 * 分发的时候
 * EventBus.emit('add') --->分发(触发)事件--->f1,f2,f3 都应该被调用
 * 
 * 容器:存储要绑定的事件及对应的回调函数---->
 * [add,del,update]--->事件对应的回调就没了吧
 * {add:[f1,f2,f3],del:[f4],update:[f6]}
 * 
 * 按钮 的点击事件--->对应着多个回调函数
 * 
 */
(function (window) {
  // 定义事件总线对象
  const EventBus = {}
  // 定义一个容器---对象------------大容器对象
  let listenersContainer = {}
  // 绑定事件的方法
  // 大容器对象中:    {add:[f1]}   ----已经有了
  // EventBus.on('add',f1)
  // 事件对应的数组 add事件---->[f1]-----小容器数组
  EventBus.on = function (eventName, listener) {
    // 先获取小容器
    let listeners = listenersContainer[eventName]
    // 判断小容器是否存在
    if (!listeners) {
      // 此时小容器不存在,则先创建这个小容器
      listeners = []
      // 把事件名字及对应的小容器数组以键值对的方式存储到大的容器中
      listenersContainer[eventName] = listeners
    }
    // 如果存在则把传入进来的回调追加到数组中即可
    listeners.push(listener)
    // 把事件名字及对应的回调函数存储到大容器对象中
  }
  // 分发事件的方法
  // 大容器对象中:    {add:[f1,f2,f3]}   ----已经有了
  // EventBus.emit('add1',10)
  EventBus.emit = function (eventName, data) {
    // 根据事件名字获取小容器数组
    let listeners = listenersContainer[eventName]
    // 判断该容器数组是否存在,只有存在调用才有意义
    if (listeners && listeners.length > 0) {
      listeners.forEach(listener => {
        listener(data)
      })
    }
  }

  // 大容器对象中:    {add:[f1,f2,f3],del:[f4]}   ----已经有了
  // EventBus.off('add')---干掉add事件及对应的所有的回调函数
  // 解绑事件的方法
  EventBus.off = function (eventName) {
    // 判断是否传入的事件名字
    if (typeof eventName === 'undefined') {
      // 没传
      listenersContainer = {}
    } else {
      // 传了
      delete listenersContainer[eventName]
      // 或者
      // listenersContainer[eventName]=[]
    }
  }
  // 暴露事件总线对象
  window.EventBus = EventBus
})(window)