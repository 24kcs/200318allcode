<template>
  <div class="order-content">
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="orders">
      <table class="order-item" v-for="(order,index) in orders" :key="order.id">
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle">
                {{order.createTime}} 订单编号：{{order.outTradeNo}}
                <span class="pull-right delete">
                  <img src="./images/delete.png" />
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in order.orderDetailList" :key="item.id">
            <td width="60%">
              <div class="typographic">
                <img :src="item.imgUrl" />
                <a href="javascript:;" class="block-text">{{item.skuName}}</a>
                <span>x{{item.skuNum}}</span>
                <a href="javascript:;" class="service">售后申请</a>
              </div>
            </td>
            <!--div的使用,可以解决多次跨行的问题,但是产生了不必要的div标签,同时样式也发生了变化,也改变table标签中的结构代码,此时可以使用template标签,首先不会产生不必要的标签,其次也不影响结构和样式-->
            <template v-if="index===0">
              <td
                :rowspan="order.orderDetailList.length"
                width="8%"
                class="center"
              >{{order.consignee}}</td>
              <td :rowspan="order.orderDetailList.length" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{order.totalAmount}}</li>
                  <li>{{order.paymentWay==='ONLINE'?'在线支付':'货到付款'}}</li>
                </ul>
              </td>
              <td :rowspan="order.orderDetailList.length" width="8%" class="center">
                <a href="#" class="btn">{{order.orderStatus==='PAID'?'已支付':'未支付'}}</a>
              </td>
              <td :rowspan="order.orderDetailList.length" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="javascript:;">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="choose-order">
      <!--分页-->
      <Pagination
        :pageConfig="{total:total,showPageNo:5,pageNo:page,pageSize:limit}"
        @changeCurrentPage="getMyOrderList"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyOrder',
  data() {
    return {
      page: 1, // 默认第一页
      limit: 5, // 每页多少条数据
      orders: [], // 当前这一页的所有的订单列表数组信息数据
      total: 0, // 数据的总条数
    }
  },
  // 界面加载后的生命周期回调
  mounted() {
    // 界面加载后发送异步请求,获取我的订单列表信息数据
    this.getMyOrderList()
  },
  methods: {
    async getMyOrderList(page = 1) {
      // 默认是第一页,更新页码数
      this.page = page
      // 调用api接口函数,发送请求,获取 我的订单列表信息数据
      const result = await this.$API.reqMyOrderList(this.page, this.limit)
      if (result.code === 200) {
        // 获取订单信息数组数据和总的条数
        const { records, total } = result.data
        // 更新data对象中的数据
        this.orders = records
        this.total = total
      } else {
        alert(result.message || '获取订单列表信息数据失败了')
      }
    },
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.order-content {
  margin: 0 20px;
  color: #666;

  //标题
  .title {
    margin-bottom: 22px;
    border: 1px solid #ddd;

    h3 {
      padding: 12px 10px;
      font-size: 15px;
      background-color: #f1f1f1;
    }
  }

  //表头
  .chosetype {
    margin-bottom: 15px;
    color: #666;

    table {
      border: 1px solid #e6e6e6;
      border-collapse: separate;
      border-radius: 2px;
      width: 100%;
      max-width: 100%;
      border-spacing: 0;

      th {
        padding: 6px 8px;
        color: #666;
        font-weight: 700;
        vertical-align: bottom;
        background-color: #f4f4f4;
        line-height: 18px;
        border-bottom: 1px solid #e6e6e6;
        font-size: 12px;
        text-align: left;
      }
    }
  }

  // 表单内容
  .orders {
    font-size: 12px;

    a {
      &:hover {
        color: #4cb9fc;
      }
    }

    table {
      border: 1px solid #e6e6e6;
      border-collapse: collapse;
      border-radius: 2px;
      width: 100%;
      margin-bottom: 18px;
      max-width: 100%;

      th {
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: bottom;
        background-color: #f4f4f4;
        font-size: 12px;
        color: #666;

        .pull-right {
          float: right;
          cursor: pointer;

          img {
            margin-right: 10px;
            vertical-align: middle;
          }
        }
      }

      td {
        font-size: 12px;
        color: #666;
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: middle;
        border: 1px solid #e6e6e6;

        &.center {
          text-align: center;
        }

        .typographic {
          img {
            float: left;
            margin-right: 10px;
            width: 100px;
            height: 100px;
          }

          a {
            float: left;
            min-width: 80px;
            max-width: 250px;
            color: #e1251b;

            &.service {
              color: #666;
            }
          }

          span {
            float: left;
            min-width: 80px;
            max-width: 250px;
            text-align: center;
          }
        }
      }
    }
  }

  // 分页
}
</style>