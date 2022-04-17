<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="toBig($event)"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  props: ['imageList'],
  computed: {
    imgObj() {
      return this.imageList[this.currentIndex] || {}
    }
  },
  methods: {
    toBig(e) {
      let mask = this.$refs.mask
      let top = e.offsetY - mask.offsetHeight / 2
      let left = e.offsetX - mask.offsetWidth / 2
      mask.style.top = top + 'px'
      mask.style.left = left + 'px'
      if (top <= 0) {
        mask.style.top = '0px'
      } else if (top >= mask.offsetHeight) {
        mask.style.top = mask.offsetHeight + 'px'
      }
      if (left <= 0) {
        mask.style.left = '0px'
      } else if (left >= mask.offsetWidth) {
        mask.style.left = mask.offsetWidth + 'px'
      }
      let big = this.$refs.big
      big.style.top = -top * 2 + 'px'
      big.style.left = -left * 2 + 'px'
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  mounted() {
    this.$bus.$on('getIndex', val => {
      this.currentIndex = val
    })
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

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
    z-index: 998;
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
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

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