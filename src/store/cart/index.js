import { reqAddCartSuccess, reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"


const actions={
  //获取商品数据
  async getCartList({commit}){
    let result = await reqCartList()
    if(result.code===200){
      commit('GETCARTLIST',result.data)
    }
  },

  //修改商品个数发送请求
  async changeSkuNum({commit},{id,num}){
    let result = await reqAddCartSuccess(id,num)
    if(result.code===200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },

  //删除单个商品
  async removeCartList({commit},skuId){
    let result = await reqDeleteCartById(skuId)
    if(result.code===200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  //删除选中
  removeAllList({dispatch,state}){
    let promiseAll=[]
    state.cartList.cartInfoList.forEach(val=>{
      if (val.isChecked) {
        let result = dispatch('removeCartList',val.skuId)
        promiseAll.push(result)
      }
    })
    return Promise.all(promiseAll)
  },

  //更改单个商品状态
  async changeChecked({commit},{skuId,isChecked}){
    isChecked = (isChecked == true) ? 0 : 1
    let result = await reqUpdateCheckedById(skuId,isChecked)
    if(result.code===200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },

  //更改全部商品状态
  changeAllChecked({dispatch,state},all){
    let promiseAll = []
    all = (all == true) ? 1 : 0
    state.cartList.cartInfoList.forEach(val=>{
     let result= dispatch('changeChecked',{skuId:val.skuId,isChecked:all})
        promiseAll.push(result)
    })
    return Promise.all(promiseAll)
  }

}
const mutations={
  GETCARTLIST(state,cartList){
    state.cartList=cartList[0] || {}
  }
}
const getters={
  cartInfoList(){
    return state.cartList.cartInfoList || []
  }
}
const state={
  cartList:{}
}

export default{
  actions,
  mutations,
  getters,
  state
}