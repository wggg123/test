//对axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"

import store from '@/store'

import { getUuid } from '@/utils/uuid'

//利用axios对象的方法create，创建一个axios实例
const request=axios.create({
  //配置对象
  //基本路径指的是端口号后自带/api
  baseURL:'/api',
  //代表请求超时的时间
  timeout:5000,
})

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
request.interceptors.request.use((config)=>{
  //config:配置对象，对象里面有一个属性很重要,headers请求头
  //进度条开始动
  //给请求头加uuid生成的userTempId
  if(store.state.detail.uuid_token){
    config.headers.userTempId = store.state.detail.uuid_token
  }
  if(store.state.user.token){
    config.headers.token = localStorage.getItem('TOKEN')
  }
  nprogress.start()
  return config
})

//响应拦截器
request.interceptors.response.use((res)=>{
  //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
  //进度条结束
  nprogress.done()
  return res.data
},(err)=>{
  //响应失败的回调函数
  return Promise.reject(new Error('faile'))
})

export default request