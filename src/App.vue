<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    //$store里的dispatch触发了action里的同名函数
    this.$store.dispatch('categoryList')
  }
}
</script>

<style lang="less">
</style>
