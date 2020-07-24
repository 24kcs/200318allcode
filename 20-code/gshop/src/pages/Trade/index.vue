<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        class="address clearFix"
        v-for="(addr,index) in tradeInfo.userAddressList"
        :key="addr.id"
      >
        <!--显示的是收件人的名字-->
        <span class="username" :class="{selected:selectedAddr===addr}">{{addr.consignee}}</span>
        <p @click="selectedAddr=addr">
          <span class="s1">{{addr.userAddress}}</span>
          <span class="s2">{{addr.phoneNum}}</span>
          <span class="s3" v-if="addr.isDefault==='1'">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left:5px;">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="(item,index) in tradeInfo.detailArrayList"
          :key="item.skuId"
        >
          <li>
            <img :src="item.imgUrl" alt />
          </li>
          <li>
            <p>{{item.skuName}}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{item.orderPrice}}</h3>
          </li>
          <li>X{{item.skuNum}}</li>
          <li>有货</li>
        </ul>
      </div>

      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="orderComment"></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b>
            <i>{{tradeInfo.totalNum}}</i>件商品，总商品金额
          </b>
          <span>¥{{tradeInfo.totalAmount}}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:
        <span>¥{{tradeInfo.totalAmount}}</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{selectedAddr.userAddress}}</span>
        收货人：
        <span>{{selectedAddr.consignee}}</span>
        <span>{{selectedAddr.phoneNum}}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- <router-link class="subBtn" to="/pay">提交订单</router-link> -->
      <a href="javascript:;" class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState } from 'vuex'
export default {
  name: 'Trade',
  data() {
    return {
      selectedAddr: {}, // 用来存储监视后发生变化的收件人信息对象
      orderComment: '老板,轻快一点发货啦,谢谢啊!',
    }
  },
  // 计算属性
  computed: {
    ...mapState({
      tradeInfo: (state) => state.order.tradeInfo,
    }),
  },
  watch: {
    // 可以直接监视这个数组,数组中的对象数据变化后,再进行操作---保存这个数据
    'tradeInfo.userAddressList'(value) {
      // value-->就是这个数组数据
      // 如果当前这个数组中某个地址信息对象的isDefault是'1'的情况下,说明这个对象最终展示出来的收件人的相关信息,应该被选中
      const defaultAddr = value.find((addr) => addr.isDefault === '1')
      // 判断该数据是否存在
      if (defaultAddr) {
        // 先保存这个数据
        this.selectedAddr = defaultAddr
      }
    },
  },
  // 界面的加载后的生命周期回调
  mounted() {
    // 分发action,获取订单的详情信息
    this.$store.dispatch('getTradeInfo')
  },
  methods: {
    // 支付的操作---跳转到支付的界面
    async submitOrder() {
      // 收集数据---获取订单详情的编号和 商品信息数组
      const { tradeNo, detailArrayList } = this.tradeInfo
      // 收集数据---收件人的信息
      const { consignee, userAddress, phoneNum } = this.selectedAddr
      const orderInfo = {
        consignee, // 收件人的名字
        consigneeTel: phoneNum, // 收件人的电话
        deliveryAddress: userAddress, // 收件人的地址
        paymentWay: 'ONLINE', // 支付方式,默认是在线支付
        orderComment: this.orderComment, // 支付的备注信息
        orderDetailList: detailArrayList, // 订单中的商品信息数组(订单中买的所有的商品,每个商品都是一个对象,一个订单中有多个商品)
      }
      // 调用api接口,并接收返回来的订单信息数据
      const result = await this.$API.reqSubmitOrder(tradeNo, orderInfo)
      if(result.code===200){
        // 获取订单的id值
        const orderId = result.data
         // 跳转到支付的界面/pay中,同时携带订单的id值
         this.$router.push({path:'/pay',query:{orderId}})
      }else{
        alert('订单提交失败了')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: '';
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;
        background: #feedef;
        margin: 5px 0;
        li {
          line-height: 30px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px '微软雅黑';
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>