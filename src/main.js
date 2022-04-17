import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import TypeNav from '@/components/TypeNav/TypeNav.vue'
import Carousel from '@/components/Carousel/Carousel.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import "@/mock/mockServe"
import 'swiper/css/swiper.css'

import * as API from '@/api/index.js'

import {MessageBox,Button} from 'element-ui'
import VueLazyload from 'vue-lazyload'

import error from '@/assets/error.png'
import loading from '@/assets/loading.gif'
import "@/plugins/validate";


Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: error,
  loading: loading,
  attempt: 1
})
Vue.prototype.$api = API

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

Vue.component(Button.name, Button);



new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
