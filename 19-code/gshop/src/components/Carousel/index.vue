<template>
  <div class="swiper-container" id="swiper1" ref="sw1">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel,index) in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl" alt />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
// 引入swiper
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: {
    carouselList: Array
  },
  // 界面加载后的生命周期回调
  mounted() {
    /*
     怀疑当前组件没有加载成功,所以,在mounted中进行测试,测试结果是执行了3次!
     为什么执行了3次? 当前的组件被使用了三次(ListContainer组件一次,Floor组件两次)
     怀疑Floor组件中使用Carousel组件的时候,传入的(轮播图)数据有问题,所以,打印carouselList数组的长度(个数)---- 0 , 3 3 浏览器显示的结果!
     分析:carouselList数组的长度 应该是: 4 , 3 , 3,为什么?
     原因:
     ListContainer组件使用Carousel组件的时候传入的数据banners数组中有4个数据,所以,第一次打印carouselList.length--->4个
     Floor组件遍历了两次,每一次遍历的时候,内部都使用了Carousel组件,并且传入了carouselList数组数据,该数组中有3个数据,所以,第二次和第三次打印carouselList.length--->都是---->3个
     所以,根据分析结果,得到结论: 4 ,3 ,3
     所以,测试:console.log('mounted----->',this.carouselList.length) 得到的结果:0,3,3 
     问题:到底是分析出了问题还是浏览器出了问题?
     分析结果:4,3,3
     浏览器输出结果:0,3,3
     很明显:分析结果和浏览器的打印结果有问题,此时查看监视是最好的选择,通过查看监视,发现carouselList.length 打印结果是4,而且只执行1次,说明:carouselList数组的数据就发生了一次的变化
     此时:
     mounted中的代码什么时候执行? 如果当前组件被使用了(其他组件用到了该组件),而且该组件中的DOM已经全部的渲染完毕了(界面加载完毕了),那么此时mounted中的代码才会执行
     watch中的代码什么时候执行? 如果监视的数据发生了变化,此时才会执行watch中的代码(也就是说,如果监视的数据没有变化,那么就不会执行里面的代码)

     ListContainer组件中使用Carousel组件的时候,传入了一个数据banners给了carouselList,那么,mounted中代码执行的时候,说明界面已经加载完毕了,但是,后来carouselList肯定是发生了变化,也就是说,一开始的时候carouselList数组数据是空的,传过来的之后,数据由0个变成了4个,这个时候,watch中的代码就会立刻的执行,创建swiper对象,轮播图就有了效果
     为什么Carousel组件中的carouselList数组数据一开始是0呢?(本身使用的时候我已经直接传入了数据啊!)
     Floor组件使用Carousel还没分析呢!======================坑
     需要清楚当前的Carousel组件到底是怎么创建

     ListContainer组件中 :  <Carousel :carouselList="banners" />
     组件在使用的过程中,如果通过强制绑定数据的方式,向该组件内部传递数据,该传入的数据有值或者没有值,都不会影响该组件的创建,所以,该组件可以正常的渲染,正常的加载出来,既然如此,该组件的mounted中的代码会正常的执行


     Home组件中:  <Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
     组件在使用的过程中,如果通过v-for指令遍历数据的方式产生(创建)组件,并使用,有问题,v-for指令是一个条件,遍历的数组(对象)如果没有数据,叫做条件不满足,既然条件不满足,那么该组件无法创建
     Floor组件中:   <Carousel :carouselList="floor.carouselList" />
     所以,如果说Floor组件中的v-for指令遍历的floors数组没有数据,那么Floor组件就不会创建,如果不能创建,就是不能使用,既然不能使用,那么该组件中的界面就不会渲染,那么,mounted中的代码就不会执行



    大轮播图: 0 ----->4
    ListContainer组件中使用了<Carousel :carouselList="banners" /> 轮播图组件
    一开始的时候Home组件中的mounted中通过dispatch提交了action,目的是获取banners数据，但是毕竟是在mounted中执行的请求(action中发送的)的代码,此时这里的代码能够执行,是因为当前的Home组件中的子级组件已经全部的渲染完毕了(组件已经加载完毕了--->ListContainer组件---->Carousel组件),Carousel组件在渲染的时候,传入了banners数组数据,但是此时banners没有数据,因为没有发送请求呢,所以,此时Carousel组件可以正常的渲染,那么该组件中的mounted中的代码就会执行,此时内部的carouselList数组的数据是0个,但是组件已经加载完毕了,然后Home组件的mounted开始执行,内部发送请求,请求也需要时间,响应回来的数据也需要时间,有可能正好是在Carousel组件渲染完毕后的一刹那,此时请求的banners数据有了,那么也就意味着<Carousel :carouselList="banners" />传入了banners数据了,但是Carousel的mounted中的代码已经执行完毕了(就执行一次),所以,一开始在mounted中的输出的carousel.length的结果就是0,可是,由于banners数据已经有了---->就是数据发生了变化,只要数据发生了变化,那么就会立刻的进入到了watch中,就会创建swiper对象,此时页面中的大轮播图就有了效果了


     小轮播图：3 3
     一开始的时候Home组件中:<Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
     此时Home的mounted中的异步请求的代码还没有执行呢,页面没有加载完毕,执行到Floor组件的v-for指令的之后,悲剧了,floors没有数据,则,Floor组件不会创建,但是,代码会继续的向后执行,完毕后,mounted中的异步请求代码开始执行,发送请求,获取返回的数据,突然,响应的数据中floors数组有数据了,立刻,创建Floor组件,满足了v-for指令的条件,也就是floors数组中有两个对象,每个对象中都有一个属性carouselList,是个数组(有3个数据),Floor组件内部此时正好用到了:<Carousel :carouselList="floor.carouselList" />,而此时floor.carouselList数组中有数据(3个),此时Carousel组件可以渲染了(第一次渲染的时候就有数据),那么界面就加载了,mounted中的代码就会执行,所以,mounted中的carouselList.length的结果是3 该组件用了两次,所以,输出的两次结果都是3,但是啊,因为floor对象中的carouselList数组中的数据确实是3个,而且自始至终从来没有变化过,所以,不会执行watch中的代码,所以,不会创建swiper对象的,所以,轮播图没有效果

     至此: Carousel组件中mounted内部代码执行了3次, 0 , 3, 3
           Carousel组件中的watch内部代码只执行了1次, 4


    分析总结:
    组件在创建的过程中如果使用了强制数据绑定,那么该绑定的数据有无都不影响组件的创建
    组件在创建的过程中如果使用v-for指令,那么如果遍历的过程中不满足v-for指令的条件,则该组件不会被创建
    组件在创建的过程中,mounted中的代码只会执行一次,而且是在该组件加载完毕后才执行,
    组件中的watch中的代码执行也是有条件,条件:如果组件加载的过程中的数据发生了变化,那么才会执行
    该轮播图的bug就在于第一次使用该组件,内部传入的数组数据是0个,后来数组数据变化了,watch中的代码就会执行--->创建swiper对象
    该组件在Floor内部使用的时候,由于Floor组件使用的v-for指令,遍历数据的时候,不满足指令条件,该组件无法创建,后来有了数据,Floor组件创建,此时使用的轮播图组件直接传入了数组数据(有值),那么watch中的代码由于传入的数据的值没有变化过,所以,不会执行
    数据变化:一开始组件加载的时候,还没有发送请求,界面加载后发送的请求,也需要时间获取响应的数据,才造成的问题


    通过分析及代码执行的结果得到结论:
    大轮播图没有问题,因为数据变化,watch中的代码可以执行
    小轮播图有问题,因为数据没有变化,watch中的代码没有执行
    如何解决:设置watch中的代码一开始就执行一次

    原本watch就执行一次,现在执行了4次,不需要,执行3次就可以了

    面试题:说说你在开发项目中遇到了什么难点,怎么解决的?
    
    
    */
    // console.log('mounted----->', this.carouselList.length)
  },
  watch: {
    carouselList: {
      handler: function() {
        // console.log('嘎嘎')
        if(this.carouselList.length===0)return
        // console.log('嘎嘎')
        this.$nextTick(() => {
          // console.log('watch----->',this.carouselList.length)
          var mySwiper = new Swiper(this.$refs.sw1, {
            // 直接使用dom对象
            loop: true, // 循环模式选项
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
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>