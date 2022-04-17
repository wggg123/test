import { reqGetSearchList } from "@/api"

const actions={
  async getSearchList({commit},params){
    let result = await reqGetSearchList(params)
    if(result.code===200){
      commit('GETSEARCHLIST',result.data)
    }
  }
}
const mutations={
  GETSEARCHLIST(state,searchlist){
    state.searchList=searchlist
  }
}
const getters={
  attrsList(){
    return state.searchList.attrsList || []
  },
  goodsList(){
    return state.searchList.goodsList || []
  },
  trademarkList(){
    return state.searchList.trademarkList || []
  }
}
const state={
  searchList:{}
}

export default{
  actions,
  mutations,
  getters,
  state
}