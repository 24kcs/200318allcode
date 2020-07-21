<template>
  <div class="swiper-container" ref="sw2">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImg,index) in skuImageList" :key="skuImg.id">
        <img
          :src="skuImg.imgUrl"
          @click="changeCurrentIndex(index)"
          :class="{active:currentIndex===index}"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapGetters } from 'vuex'
// 引入swiper
import Swiper from 'swiper'
export default {
  name: 'ImageList',
  data() {
    return {
      currentIndex: 0 // 默认是第一个图片有这个类样式
    }
  },
  computed: {
    ...mapGetters(['skuImageList'])
  },
  watch: {
    skuImageList: {
      handler: function(val) {
        if (val.length === 0) return
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.sw2, {
            slidesPerView: 5, // 一次显示5项图片(swiper-slide ---相当于是显示了5屏)
            slidesPerGroup: 5, // 以5项进行一次的切换
            // 直接使用dom对象
          
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  methods: {
    // 点击图片,设置当前点击的图片的选中索引,有高亮显示的效果
    changeCurrentIndex(index) {
      // 设置当前某个图片高亮显示选中的索引值
      this.currentIndex = index
      // 通知外部的父级组件,传入一个索引值
      this.$emit('changeCurrentImgIndex',index)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>