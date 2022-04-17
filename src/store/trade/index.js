import { reqAddressInfo, reqGoodsListInfo } from "@/api"

const actions={
  async getAddressInfo({commit}){
    let result = await reqAddressInfo()
    if (result.code==200) {
      commit('GETADDRESSINFO',result.data)
    }
  },
  async getGoodsInfo({commit}){
    let result = await reqGoodsListInfo()
   if (result.code==200) {
     commit('GETGOODSINFO',result.data)
   }
  }
}
const mutations={
  GETADDRESSINFO(state,address){
    state.address=address
  },
  GETGOODSINFO(state,goodsInfo){
    state.goodsInfo= goodsInfo
  }
}
const state={
  address:[],
  goodsInfo:{}
}
const getters={
  detailList(){
    return state.goodsInfo.detailArrayList || []
  }
}
export default{
  actions,
  mutations,
  state,
  getters
}