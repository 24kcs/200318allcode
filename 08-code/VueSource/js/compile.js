// 编译的构造函数
function Compile(el, vm) {
    // el----->#app 
    // 保存vm实例对象
    this.$vm = vm;
    // this.isElementNode(el) 内部通过nodeTyep属性,判断当前的el是不是一个标签节点
    // el---->#app,所以, document.querySelector(el) 获取的是id为app 的这个div标签节点
    // $el---->div标签对象
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    // 判断div是否存在
    if (this.$el) {
        // 创建文档碎片对象,同时把div中所有的节点全部的扔进文档碎片对象----可以理解为 虚拟DOM
        this.$fragment = this.node2Fragment(this.$el);
        // 真正的模版解析的操作代码
        this.init(); // 内存中的文档碎片对象中进行 模版的解析操作
        // 此时模版解析已经结束了,把文档碎片对象重新的添加到div容器中
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    constructor: Compile, // 构造器
    // el----div容器对象
    node2Fragment: function(el) {
        // 创建文档碎片对象
        var fragment = document.createDocumentFragment(),
            child;
        // 把div容器中所有的节点通过遍历的方式一个一个的扔进文档碎片对象中
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        // 返回文档碎片对象
        return fragment;
    },
    // 实现模版解析的操作代码
    init: function() {
        // 下面的这行代码才是真正的模版解析代码
        // 传入了文档碎片对象
        this.compileElement(this.$fragment);
    },
    // 模版解析代码的方法-------el----->文档碎片对象fragment
    compileElement: function(el) {
        // 获取文档碎片对象中所有的子节点,存储到childNodes 变量中
        var childNodes = el.childNodes,
        // 把当前编译实例对象存储到me 中-----me------编译实例对象
            me = this; 
        // childNodes--->伪数组,不能直接调用数组的遍历方法,需要把伪数组转真数组
        // 遍历文档碎片对象中所有的子节点
        [].slice.call(childNodes).forEach(function(node) {
            // 把节点中的文本内容存储到text变量中
            var text = node.textContent;
            // 插值语法的正则表达式
            var reg = /\{\{(.*)\}\}/;
            // 判断当前的节点是不是标签
            // node----button按钮
            if (me.isElementNode(node)) {
                me.compile(node);
                

                // 判断当前的节点是不是文本节点,同时,当前这个文本节点和插值正则是否匹配
            } else if (me.isTextNode(node) && reg.test(text)) {
                // 当前的节点是文本节点,同时也和插值的正则表达式匹配----  {{msg}}----插值
                // node----文本节点---->{{msg}}  
                //  RegExp.$1.trim()------msg 表达式
                me.compileText(node, RegExp.$1.trim());
            }
            // 当前的这个节点有子节点(当前这个节点是一个父级节点)并且至少有一个子节点
            // 当前节点如果还有子节点
            if (node.childNodes && node.childNodes.length) {
                // 递归, node是当前节点
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        // node-----button
        // 获取button按钮上所有的属性  v-on:click="showName"
        var nodeAttrs = node.attributes,
        // 把当前的编译对象保存到me中
            me = this;
        // 遍历当前这个标签上所有的属性
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // attr----->v-on:click="showName"
            // attrName----->v-on:click  ---->获取的是属性的名字
            var attrName = attr.name;
            // 判断当前的这个属性是不是一个指令
            if (me.isDirective(attrName)) {
                // 此时是指令,获取当前这个属性的值  exp----->showName
                var exp = attr.value;
                // attrName----->v-on:click
                // dir----->on:click---干掉v-
                var dir = attrName.substring(2);
                // 判断当前的指令是不是事件指令
                if (me.isEventDirective(dir)) {
                    // 说明此时attrName是一个事件指令
                    // node-----button  me.$vm---->vm   exp----->showName  dir---->on:click
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    },
    // 编译文本节点方法 node---->{{msg}}  exp----->msg
    compileText: function(node, exp) {
        // 编译工具对象调用text方法,
        // node---->{{msg}} this.$vm---->vm实例对象  exp----->msg
        compileUtil.text(node, this.$vm, exp);
    },
    // 判断当前的这个属性是不是一个指令
    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },
    // 判断当前的这个指令是不是一个事件的指令
    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },
    // 判断当前节点是不是标签节点
    isElementNode: function(node) {
        return node.nodeType == 1;
    },
    // 判断当前节点是不是文本节点
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    // node---->{{msg}}   vm   exp----->msg
    text: function(node, vm, exp) {
        // node---->{{msg}}   vm   exp----->msg   'text'
        this.bind(node, vm, exp, 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    // node---->{{msg}}  vm   exp---->msg   dir----->'text'
    bind: function(node, vm, exp, dir) {
        // updater---->对象
        // updater['textUpdater']----->updater.textUpdater
        // obj['name']---->obj.name
        // updaterFn----->updater.textUpdater函数
        var updaterFn = updater[dir + 'Updater'];
        // 判断当前这个函数存在不,如果存在则调用
        // node----->{{msg}}
        // this---->编译实例对象 
        // this._getVMVal(vm, exp)  exp--->msg表达式 
        // updaterFn(node, msg属性的值);
        // updaterFn('{{msg}}', '真开心');
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // 监视操作============
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        // node-----button  vm   exp----->showName  dir---->on:click
        // 干掉on:   eventType----->click
        var eventType = dir.split(':')[1],
        // vm.$options.methods['showName']---->从methods中获取showName的函数,并且存储到fn中

        // fn ------>showName
            fn = vm.$options.methods && vm.$options.methods[exp];
        // 判断click存在并且 showName也存在
        if (eventType && fn) {
            // node---->button,eventType----->click
            // 通过addEventListener 为button绑定click事件,回调是showName
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    // vm---->实例对象  exp---->msg
    // 获取msg属性的值
    _getVMVal: function(vm, exp) {
        // 保存vm实例对象到val变量中
        var val = vm;
        // 干掉msg表达式中的. 形成一个数组存储到exp 中
        // exp--->数组 ---->['msg']------>为什么要调用splie('.'),因为表达式中有可能有这种写法: obj.name
        exp = exp.split('.');
        // 遍历数组中的每个表达式,获取该表达式在vm中的data中的这个属性的值
        exp.forEach(function(k) {
            // k----->'msg'
            // 把vm.msg的值存储到val中
            val = val[k];
        });
        // 把msg属性的值返回
        // msg---->'真开心'
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};

// 更新操作对象
var updater = {
    // 更新文本节点中的文本内容
    // node---->{{msg}}  value---->'真开心'
    textUpdater: function(node, value) {
        // {{msg}}----->'真开心'
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};