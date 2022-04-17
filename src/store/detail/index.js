import { reqAddCartSuccess, reqGetDetailList } from "@/api"
import { getUuid } from "@/utils/uuid"

const state={
  detailList:{},
  uuid_token:getUuid()
}
const actions={
  async getDetailList({commit},detailId){
    let result = await reqGetDetailList(detailId)
    if(result.code===200){
      commit('GETDETAILLIST',result.data)
    }
  },
  async addCartSuccess({commit},{id,num}){
    let result= await reqAddCartSuccess(id,num)
    if(result.code===200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  
}
const mutations={
  GETDETAILLIST(state,detailList){
    state.detailList=detailList
  }
}
const getters={
  categoryView(){
    return state.detailList.categoryView || {}
  },
  skuInfo(){
    return state.detailList.skuInfo || {}
  },
  spuSaleAttrList(){
    return state.detailList.spuSaleAttrList || []
  }
  
}

export default{
  state,
  mutations,
  actions,
  getters
}