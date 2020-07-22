<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item,index) in shopCartList" :key="item.id">
          <li class="cart-list-con1">
            <!--v-model这种方式是直接获取该购物项的isChecked的值(1/0),如果点击了复选框,直接设置了购物项的isChecked等于1/0,并不能直接分发action,调用api接口的方式来真正的修改购物项的选中状态-->
            <!-- <input type="checkbox" name="chk_list" v-model="item.isChecked" /> -->
            <!--通过计算属性想要修改或者获取购物项的选中状态也有问题,就是获取不到索引值-->
            <!-- <input type="checkbox" name="chk_list" :checked="isChecked"  /> -->
            <!--购物项的选中状态实际上就是在设置html标签的checked属性值,所以,把这个属性值用动态的购物项的isChecked来绑定,终究是要点击复选框来改变选中状态-->
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @change="checkCartItem(item)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>

          <!--修改商品的数量-->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeItemCount2(item,-1)">-</a>
            <!-- <input autocomplete="off" type="text" value="1" minnum="1" class="itxt" v-model="item.skuNum" /> -->
            <!-- <input autocomplete="off" type="text" minnum="1" class="itxt" v-model="item.skuNum" /> -->
            <!--input事件:数据发生变化就会触发,change事件:数据发生改变,失去焦点就触发-->
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="item.skuNum"
              @change="changeItemCount2(item,$event.target.value*1-item.skuNum)"
            />
            <a href="javascript:void(0)" class="plus" @click="changeItemCount2(item,1)">+</a>
          </li>

          <li class="cart-list-con6">
            <span class="sum">{{item.skuPrice*item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <!--删除的是某个购物项-->
            <a href="javascript:;" class="sindelet" @click="deleteCartItem(item.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- <input class="chooseAll" type="checkbox" v-model="isAllCheck" /> -->
        <!-- <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="checkAll" /> -->
        <!-- <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="checkAll2" /> -->
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="checkAll3" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCartItems">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{totalCount}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <!--需要登录的,如果没有登录则跳转到登录界面-->
          <a class="sum-btn" href="javascript:;" @click="toTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  computed: {
    // 通过辅助函数获取state对象中的购物车商品信息数据数组
    ...mapState({
      shopCartList: state => state.shopcart.shopCartList
    }),
    // 通过vuex的辅助函数获取计算属性中的 总数量,总价格,是否全选
    ...mapGetters([
      'totalCount',
      'totalPrice',
      'isAllCheck',
      'selectedCartItems'
    ])
    // isChecked:{
    //   // 获取购物项的选中状态
    //   get(){
    //     // index---->索引,先遍历,才能获取索引值
    //     return this.shopCartList[index].isChecked
    //   },
    //   // 设置购物项的选中状态
    //   set(val){
    //     // val----->勾选或者没有勾选----true/false
    //     this.shopCartList[index].isChecked=val
    //   }
    // }
  },
  // 页面加载后的生命周期回调
  mounted() {
    // 分发action从而获取购物车的商品信息数据
    this.getShopCartList()
  },
  methods: {
    // 获取购物车商品信息数据
    getShopCartList() {
      this.$store.dispatch('getShopCartList')
    },
    // 删除某个购物项的点击事件的回调函数
    async deleteCartItem(skuId) {
      if (window.confirm('确定删除吗')) {
        // 对话框很丑但是很温柔,以后用UI组件库
        // 分发action的同时,获取操作后的提示信息
        // const errorMsg = await this.$store.dispatch('deleteCartItem1', skuId)
        // if (!errorMsg) {
        //   // 成功了---则重新获取的新的数据
        //   this.getShopCartList()
        // } else {
        //   // 失败了
        //   alert(errorMsg)
        // }
        // 通过try-catch的方式
        try {
          await this.$store.dispatch('deleteCartItem2', skuId)
          // 成功了---则重新获取的新的数据
          this.getShopCartList()
        } catch (error) {
          alert(error.message || '删除失败了')
        }
      }
    },
    // 删除所有选中的购物项的点击事件的回调函数
    deleteCartItems() {
      // 获取所有选中的商品购物项
      const { selectedCartItems } = this
      // 如果没有选中的商品(选中购物项的数组是空的)
      if (selectedCartItems.length === 0) return
      // 提示信息
      if (window.confirm('确定删除所有选中的商品吗')) {
        const promises = [] // 存储每个promise对象,最后进行统一的处理
        selectedCartItems.forEach(item => {
          // 分发那个删除某个购物项的action
          const promise = this.$store.dispatch('deleteCartItem2', item.skuId)
          promises.push(promise)
        })
        // 最后进行统一的处理
        Promise.all(promises).then(
          values => {
            // 重新获取购物车的商品信息数据
            this.getShopCartList()
          },
          error => {
            alert(error.message || '删除失败了')
          }
        )
      }
    },
    // 点击复选框修改当前购物项的选中状态
    checkCartItem(item) {
      // 获取当前这个复选框绑定的购物项的选中状态并取反
      const isChecked = item.isChecked === 1 ? 0 : 1
      // 获取当前这个购物项的skuId值
      const { skuId } = item
      // 分发action
      this.$store.dispatch('checkCartItem', { skuId, isChecked }).then(
        () => {
          // 状态修改成功了
          this.getShopCartList()
        },
        error => {
          // 状态修改失败了
          alert(error.message || '修改状态失败')
        }
      )
    },
    // 全选或者全不选的操作
    checkAll(event) {
      // 获取当前复选框改变状态的状态值(true/false)
      const isChecked = event.target.checked * 1
      // 后台并没有提送一次性修改所有商品的选中状态的接口(调用一个一个修改商品选中状态的接口)
      // console.log(isChecked)
      // 遍历所有的购物车商品,一个一个进行修改(一个一个调用修改商品选中状态的接口--action)
      const promises = [] // 存储promise对象的
      this.shopCartList.forEach(item => {
        const promise = this.$store.dispatch('checkCartItem', {
          skuId: item.skuId,
          isChecked
        })
        // 每个promise对象都添加到这个数组中
        promises.push(promise)
      })
      // 统一处理promise
      Promise.all(promises).then(
        () => {
          // 成功了,重新获取购物车数据
          this.getShopCartList()
        },
        error => {
          alert(error.message)
        }
      )
    },
    // 全选或者全不选的操作的第二种写法
    async checkAll2(event) {
      // 获取当前复选框改变状态的状态值(true/false)
      const isChecked = event.target.checked * 1
      // 把所有分发action返回的promise进行同一个处理
      const promises = this.shopCartList.reduce((pre, item) => {
        const promise = this.$store.dispatch('checkCartItem', {
          skuId: item.skuId,
          isChecked
        })
        pre.push(promise)
        return pre
      }, [])
      try {
        // 进行统一处理
        await Promise.all(promises)
        // 成功了
        this.getShopCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    // 全选或者全不选的操作的第三种写法
    async checkAll3(event) {
      // 获取当前复选框改变状态的状态值(true/false)
      const isChecked = event.target.checked * 1
      // 把所有分发action返回的promise进行同一个处理
      const promises = this.shopCartList.map(item => {
        return this.$store.dispatch('checkCartItem', {
          skuId: item.skuId,
          isChecked
        })
      })
      try {
        // 进行统一处理
        await Promise.all(promises)
        // 成功了
        this.getShopCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    // 文本框中的商品数量改变的回调函数
    async changeItemCount(item, changeNum) {
      // 获取商品的skuId
      const { skuId } = item
      // 判断原来的数量和修改后的数量累计和应该大于0才有意义
      if (item.skuNum + changeNum > 0) {
        // 分发action
        const errorMsg = await this.$store.dispatch('addToCart2', {
          skuId,
          skuNum: changeNum
        })
        if (!errorMsg) {
          // 成功了,重新获取数据
          this.getShopCartList()
        } else {
          alert(errorMsg)
        }
      } else {
        alert('抱歉,您输入的数据有问题,请重新数据')
      }
    },
    // 文本框中的商品数量改变的回调函数----优化代码
    changeItemCount2(item, changeNum) {
      // 获取商品的skuId
      const { skuId } = item
      // 判断原来的数量和修改后的数量累计和应该大于0才有意义
      if (item.skuNum + changeNum > 0) {
        // 分发action
        this.$store.dispatch('addToCart3', {
          skuId,
          skuNum: changeNum
        })
      }
    },

    // 点击结算的按钮,的回调函数---->跳转到结算的组件界面
    toTrade(){
      this.$router.push('/trade')
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>