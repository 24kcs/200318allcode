// 构造函数
function MVVM(options) {
    // options---->实例化MVVM(Vue)的时候传入进来的配置对象{data,el}
    // 判断配置对象是否存在,并保存到$options属性中
    this.$options = options || {};
    // 把当前$options对象中的data拿出来,保存到_data属性中,同时再次保存到data这个局部变量中
    var data = this._data = this.$options.data;
    // 把当前vm实例对象保存到变量me中
    var me = this;
    // 把data变量中所有的属性全部拿出来,进行遍历操作
    Object.keys(data).forEach(function(key) {
        // key--->每个属性---->msg
        // 实现数据代理的关键
        // me----->当前实例对象---this---->vm
        // 传入当前data中的属性---msg
        me._proxyData(key);
    });
    // 初始化计算属性的
    this._initComputed();




    // 调用劫持的函数,传入data对象及vm实例对象
    // data---->变量data,this---->vm实例对象
    // 数据代理之后,模版解析之前,进行数据劫持操作
    observe(data, this);






    // 模版解析的操作 , 传入了el选择器('#app'),如果el没有值,就把body传进去,this---vm实例对象
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    constructor: MVVM,
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },
    // 真正的实现数据代理的方法
    _proxyData: function(key, setter, getter) {
        // key---->msg属性
        // 再次保存当前vm实例对象
        var me = this;
        setter = setter || 
        // 为vm对象,添加msg属性
        Object.defineProperty(me, key, {
            configurable: false, // 该属性不能删除
            enumerable: true, // 该属性可以被枚举遍历出来
            // 只有外部访问msg属性的时候才能够执行get方法内部的代码, vm.msg 此时就会进来
            get: function proxyGetter() {
                // me---this 把当前的这个this._data['msg']---->this._data.msg 的值返回 
                return me._data[key];
            },
            // 只有外部设置msg属性的时候才能够执行set方法内部的代码, vm.msg='您好' 此时就会进来
            set: function proxySetter(newVal) {
                // me----this  把当前的这个新值'哈哈1' 给 this._data['msg']--->this._data.msg='哈哈1'
                me._data[key] = newVal;
            }
        });
    },


    // 计算属性的源码并没有全部的实现完毕----放弃分析的
    _initComputed: function() {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
};