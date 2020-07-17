// 构造函数
function Watcher(vm, expOrFn, cb) {
    // 保存回调函数
    this.cb = cb;
    // 保存vm实例对象
    this.vm = vm;
    // 保存msg表达式
    this.expOrFn = expOrFn;
    // 定义了一个属性,该属性是一个对象,对象存储数据:{键:值}
    // depIds很明显就是要存储dep和id的有关系的数据
    this.depIds = {};
    // 判断当前的expOfFn---->msg  是不是一个函数(当前的表达式是不是一个函数)
    if (typeof expOrFn === 'function') {
        // 如果expOrFn中是函数,那么直接保存到getter中
        this.getter = expOrFn;
    } else {
        // this.parseGetter('msg');
        // this.getter---->存储了一个函数
        this.getter = this.parseGetter(expOrFn.trim());
    }

    // 最终this.getter中存储的就是一个函数
    // 调用了this.get()方法,获取了什么什么什么 值  给了value属性
    // 获取当前html模版中的表达式的值(这里要做的就是:建立dep和watcher的关系)
    this.value = this.get();
}

Watcher.prototype = {
    constructor: Watcher,
    // 更新数据的方法----->什么也没做
    update: function() {
        // run---->才是更新数据的方法操作----->
        this.run();
    },
    run: function() {
        // 获取当前的表达式的值,同时还是要重新的建立dep和watcher的关系
        var value = this.get();
        // 获取原来的值
        var oldVal = this.value;
        // 判断新值和原来的值是不一样的
        if (value !== oldVal) {
            // 更新数据
            this.value = value;
            // 才是真真正正的更新数据的方法
            this.cb.call(this.vm, value, oldVal);
        }
    },
    // 把dep添加到watcher中,把watcher添加到dep中
    addDep: function(dep) {
        // 判断当前watcher中的属性depIds中是否有当前这个dep的id 这个属性--->depIds:{}
        if (!this.depIds.hasOwnProperty(dep.id)) {
            // this---->watcher对象,把watcher对象添加到dep对象的subs数组中
            dep.addSub(this); // 把watcher对象添加到dep对象中
            // watcher.depIds['0']=dep
            // 把当前的dep对象的id作为键,dep对象作为值,以键值对的方式添加到watcher对象的depIds属性中
            // 把dep添加到watcher中
            this.depIds[dep.id] = dep;
        }
    },
    // 获取表达式的值的方法
    get: function() {
        // this----watcher实例对象,保存到了Dep的属性target中
        Dep.target = this;
        // 调用parseGetter中的返回值(是一个函数),并且设置内部的this是vm,传入了vm对象
        var value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    },
    // exp---->msg
    parseGetter: function(exp) {
        // 当前的表达式是不是匹配非特殊符号.这个正则---->这个表达式是不是标准的一个属性的写法
        if (/[^\w.$]/.test(exp)) return; 
        // 当前表达式绝对是正常的
        // exps---->数组--->['msg']
        var exps = exp.split('.');
        // 直接返回函数-------------------此时也是闭包
        return function(obj) {
            // obj----->vm
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                // obj参数变量 = vm[exps[i]]
                //  obj参数变量 = vm[exps[0]]
                //  obj参数变量 = vm['msg']
                //  obj参数变量 = vm.msg
                // 获取vm对象中msg属性的值---->获取vm的msg值---->mvvm.js文件中的Object.defineProperty方法的get中
                obj = obj[exps[i]];
            }
            return obj;
        }
    }
};