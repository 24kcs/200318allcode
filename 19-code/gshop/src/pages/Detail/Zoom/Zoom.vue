<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" ref="event" @mousemove="mouseHandle"></div>
    <div class="big">
      <img :src="bigImgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  props: {
    imgUrl: String,
    bigImgUrl: String
  },
  mounted() {
    // 原因:该数据的值不需要经常变化,所以,没有必要把maskWidth放在data对象中进行定义
    // 获取遮挡层的宽度(正方形)
    this.maskWidth = this.$refs.event.clientWidth / 2
  },
  methods: {
    // 鼠标移动事件
    mouseHandle(event) {
      // 获取鼠标移动的横纵坐标
      const { offsetX, offsetY } = event
      // 获取遮挡层的宽
      const maskWidth = this.maskWidth
      // 获取遮挡层div
      const maskDiv = this.$refs.mask
      // 获取大图对象
      const bigImg = this.$refs.bigImg
      // 设置鼠标的横纵轴在遮挡层的正中间位置
      let left = offsetX - maskWidth / 2
      let top = offsetY - maskWidth / 2
      // 限定鼠标移动的边界(遮挡层的移动边界)
      left = left < 0 ? 0 : left > maskWidth ? maskWidth : left
      top = top < 0 ? 0 : top > maskWidth ? maskWidth : top
      // 设置遮挡层移动
      maskDiv.style.left = left + 'px'
      maskDiv.style.top = top + 'px'
      // 设置大图移动
      bigImg.style.left = -left * 2 + 'px'
      bigImg.style.top = -top * 2 + 'px'
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #ccc;
    overflow: hidden;
    z-index: 998;
    display: none;
    background-color: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>