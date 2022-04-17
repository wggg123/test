import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"
//存储数据
const state={
  categoryList:[],
  bannerList:[],
  floorList:[]
}
//理解为计算属性
const getters={}
//修改state的唯一手段
const mutations= {
  CATEGORYLIST(state,categoryList){
    state.categoryList=categoryList
  },
  GETBANNERLIST(state,bannerList){
    state.bannerList=bannerList
  },
  GETFLOORLIST(state,floorList){
    state.floorList=floorList
  }
}
//业务逻辑
const actions= {
  //参数commit是通过赋值解析出来的实际为context.commit
  //context.commit提交一个mutation
  //context里还有state，getters获取数据
  async categoryList({commit}){
    let result = await reqCategoryList()
    if(result.code ==200){
      //这里的result.data作为mutation的第二个参数
      commit('CATEGORYLIST',result.data)
    }
  },
  async getBannerList({commit}){
    let result = await reqGetBannerList()
    if(result.code ==200){
      commit('GETBANNERLIST',result.data)
    }
  },
  async getFloorList({commit}){
    let result = await reqGetFloorList()
    if(result.code===200){
      commit('GETFLOORLIST',result.data)
    }
  }
}

export default{
  state,
  getters,
  mutations,
  actions,
}