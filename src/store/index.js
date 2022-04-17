import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import home from './home'
import search from './search'
import detail from './detail'
import cart from './cart'
import user from './user'
import trade from './trade'

const modules={
  home,
  search,
  detail,
  cart,
  user,
  trade
}
export default new Vuex.Store({
  modules
})
