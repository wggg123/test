//导入二次封装号的axios的request
import requests from "./request";
//引入虚拟接口mock数据
import mockRequests from "./mockAjax"

export const reqCategoryList=()=>{
  //发请求:axios发送请求返回结果Promise对象
  return requests({url:'/product/getBaseCategoryList',method:'get'})
}
//获取模拟数据轮播图
export const reqGetBannerList=()=>{
  return mockRequests.get('/banner')
}
export const reqGetFloorList=()=>{
  return mockRequests.get('/floor')
}
//获取搜索页面数据
export const reqGetSearchList=(params)=>{
  return requests({
    url:'/list',method:'post',
    data:params
  })
}
//获取详情页数据
export const reqGetDetailList=(detailId)=>{
  return requests({
    url:`/item/${detailId}`,method:'get',
  })
}
//商品添加到购物车，和购物车内单个商品数量的改动
export const reqAddCartSuccess=(skuId,skuNum)=>{
  return requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'
  })
}
//获取购物车内商品数据
export const reqCartList =()=>{
  return requests({url:"/cart/cartList",method:'get'})
}
//删除购物车内商品
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
//更改购物车内商品状态
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
//验证码
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
//注册 phone code password
export const reqRegister=(data)=>requests({url:`/user/passport/register`,data,method:'post'})
//登录 phone password
export const reqLogin = data =>requests({url:'/user/passport/login',data,method:'post'})
//获取用户信息
export const reqUserInfo = ()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'})
//登出
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'})
//获取用户地址
export const reqAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
//获取trade页面商品信息
export const reqGoodsListInfo=()=>requests({url:'/order/auth/trade',method:'get'})
//提交订单
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
//获取支付订单信息
export const reqPayInfo = orderId=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
//获取支付状态
export const reqPayStatus = orderId => requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
//获取个人中心数据
export const reqMyOrderList = (page,limit)=>requests.get(`/order/auth/${page}/${limit}`)
