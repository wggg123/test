<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(image,index) in imageList" :key="image.id">
        <img :src="image.imgUrl" @click="changeImage(index)" :class="{active:index == currentIndex}">
      </div>
    </div>
    <div class=" swiper-button-next">
    </div>
    <div class="swiper-button-prev"></div>
  </div>

</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'ImageList',
  props: ['imageList'],
  computed: {},
  watch: {
    imageList: {
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.swiper, {
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            slidesPerView: 3
          })
        })
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    changeImage(index) {
      this.currentIndex = index
      this.$bus.$emit('getIndex', this.currentIndex)
    }
  }
}
</script>

<style lang="less">
.swiper-container {
  height: 56px;
  width: 402px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      // width: 100%;
      // height: 100%;
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
    right: 0px;
  }

  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    margin-top: 0px;
    top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>