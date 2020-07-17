/**
 * PubSub是一个对象,可以实现任意组件之间的通信
 * 
 * 
 * var token=PubSub.subscribe(msg,subscriber)-----订阅消息
 * PubSub.publish(msg,data)----------异步发布消息
 * PubSub.publishSync(msg,data)------>同步发布消息
 * PubSub.unsubscribe(token)------->取消消息订阅
 * 
 * 
 * msg----->消息名字---->可以理解为事件总线中 事件名字 的这个参数
 * subscriber------>回调函数----->可以理解为事件总线中事件对应的回调函数
 * data------->回调函数所需要的参数数据
 * token----->标识
 * 
 * 容器: 存储 消息的名字及对应的回调函数
 * {'add':{id_1:f1,id_2:f2}---小容器}
 * 
 * 
 * 
 */

(function (window) {
  // 定义PubSub对象----消息订阅的对象
  const PubSub = {}
  // 定义容器对象,用来存储消息名字及对应的对象(对象中以键值对的方式来存储token及回调函数)----大容器
  let subScribersContainer = {}
  // 定义id标识
  let id = 0
  // 定义订阅消息的方法
  // 大容器   {'add':{id_1:f1}}
  // PubSub.subscribe('add',f2)
  PubSub.subscribe = function (msg, subscriber) {
    // 通过消息名字获取对应的回调函数容器对象---小容器
    let subscribers = subScribersContainer[msg]
    // 判断回调函数容器对象---小容器是否存在
    if (!subscribers) {
      // 定义该小容器对象
      subscribers = {}
      // 消息名字对应回调函数容器对象一起存储到大的容器对象中
      subScribersContainer[msg] = subscribers
    }
    // 定义token
    const token = 'id_' + ++id
    subscribers[token] = subscriber
    return token
  }

  // 定义异步发布消息的方法
  PubSub.publish = function (msg, data) {
    // 通过消息名字获取对应的回调函数容器对象---小容器
    let subscribers = subScribersContainer[msg]
    setTimeout(() => {
      if (subscribers) {
        // 获取小容器对象中所有的回调函数,形成一个数组,循环遍历调用并传入参数即可
        Object.values(subscribers).forEach(subscriber => {
          subscriber(data)
        })
      }
    }, 1000)

  }

  // 定义同步发布消息的方法
  // 大容器   {'add':{id_1:f1,id_2:f2}}
  PubSub.publishSync = function (msg, data) {
    // 通过消息名字获取对应的回调函数容器对象---小容器
    let subscribers = subScribersContainer[msg]
    if (subscribers) {
      // 获取小容器对象中所有的回调函数,形成一个数组,循环遍历调用并传入参数即可
      Object.values(subscribers).forEach(subscriber => {
        subscriber(data)
      })
    }
  }

  // 定义取消消息订阅的方法
  PubSub.unsubscribe = function (token) {
    // token----> 'id_1' ---- 标识
    // token----> 'add' ----消息名字
    // token----> 啥也没传
    // 什么也没传
    if (typeof token === 'undefined') {
      // 大容器干掉---取消所有的消息订阅
      subScribersContainer = {}
    } else if (token.indexOf('id_') !== -1) { // 此时的传入的是标识
      // 大容器   {'add':{id_1:f1,id_2:f2},'del:{id_3:f3}'}--->转数组[{id_1:f1,id_2:f2},{id_3:f3}]
      const subscribers = Object.values(subScribersContainer).find(subscribers => subscribers[token])
      // 判断是否存在,存在则删除
      subscribers && delete subscribers[token]
    } else {
      // 传入的是消息名字
      // 大容器   {'add':{id_1:f1,id_2:f2},'del':{'id_6':f5}}
      delete subScribersContainer[token]
    }
  }

  // 暴露
  window.PubSub = PubSub
})(window)