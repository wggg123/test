import { reqGetCode, reqLogin, reqLogout, reqRegister, reqUserInfo } from "@/api"

const actions={
  async getCode({commit},phone){
    let result = await reqGetCode(phone)
    if (result.code==200) {
      commit('GETCODE',result.data)
    }else{
      console.log(result);
    }
  },
  async getRegister({commit},{phone, code ,password}){
    let result = await reqRegister({phone, code ,password})
    if(result.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error(result.message))
    }
  },
  async getLogin({commit},{phone,password}){
    let result = await reqLogin({phone,password})
    if(result.code == 200){
      localStorage.setItem("TOKEN",result.data.token)
      commit('GETTOKEN',result.data.token)
      return result.message
    }else{
      return result.message
    }
  },
  async getUserInfo({commit}){
    let result = await reqUserInfo()
    if(result.code==200){
      commit('GETUSERINFO',result.data)
    }else{
      return result.message
    }
  },
  async getLogout({commit}){
    let result = await reqLogout()
    if(result.code ==200){
      return result.message
    }else{
      return result.message
    }
  }
}
const mutations={
  GETCODE(state,code){
    state.code = code
  },
  GETTOKEN(state,token){
    state.token = token
  },
  GETUSERINFO(state,info){
    state.info = info
  }
}
const getters={}
const state={
  code:'',
  token:localStorage.getItem('TOKEN'),
  info:{}
}
export default{
  actions,
  mutations,
  getters,
  state
}