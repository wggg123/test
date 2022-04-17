import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

//重写push方法，使push方法有成功和失败的回调函数
let originPush=VueRouter.prototype.push
VueRouter.prototype.push=function(location,resolve,reject){
  if(resolve&&reject){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}


const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component: () => import ( '@/views/Home/Home.vue'),
    meta:{
      show:true
    },
   
  },
  {
    path:'/center',
    redirect:'/center/myorder',
    component: () => import ( '@/views/Center/Center.vue'),
    meta:{
      show:true
    },
    children:[
      {
        path:'myorder',
        component:()=>import('@/views/Center/myOrder/myOrder.vue')
      },
      {
        path:'grouporder',
        component:()=>import('@/views/Center/groupOrder/groupOrder.vue')
      }
    ]
  },
  {
    path:'/paysuccess',
    component: () => import ( '@/views/PaySuccess/PaySuccess.vue'),
    meta:{
      show:true
    },
    beforeEnter: (to, from, next) => {
      if (from.path.indexOf('/pay') != -1){
        next()
      }else{
        next(false)
      }
      console.log(from.path);
    }
  },
  {
    path:'/pay/:data?',
    component: () => import ( '@/views/Pay/Pay.vue'),
    meta:{
      show:true
    },
    beforeEnter: (to, from, next) => {
      if(from.path == '/trade'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:'/trade',
    component: () => import ( '@/views/Trade/Trade.vue'),
    meta:{
      show:true
    },
    beforeEnter: (to, from, next) => {
      if(from.path == '/shopcart'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:'/shopcart',
    name:'shopcart',
    component: () => import ( '@/views/ShopCart/ShopCart.vue'),
    meta:{
      show:true
    }
  },
  {
    path:'/addcartsuccess/:id?/:num?',
    component: () => import ( '@/views/AddCartSuccess/AddCartSuccess.vue'),
    meta:{
      show:true
    }
  },
  {
    path:'/detail/:skuid?',
    component: () => import ( '@/views/Detail/Detail.vue'),
    meta:{
      show:true
    }
  },
  {
    name:'search',
    path:'/search/:keyword?',
    component:()=>import('@/views/Search/Search.vue'),
    meta:{
      show:true
    }
  },
  {
    path:'/login',
    component:()=>import('@/views/Login/Login.vue'),
    meta:{
      show:false
    }
  },
  {
    path:'/register',
    component:()=>import('@/views/Register/Register.vue'),
    meta:{
      show:false
    }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})

router.beforeEach(async (to,from,next)=>{
  let token = store.state.user.token
  let name = store.state.user.info.name
  if(token){
    //有token想去login
    if(to.path=='/login'){
      next('/home')
    }else{
      //有token且有用户信息
      if(name){
        next()
      }else{
        //有token但没有用户信息
        try{
          //用token获取用户信息
          await store.dispatch('getUserInfo')
          next()
        }catch(error){
          //token失效会获取不到用户信息报错，被捕获
          await store.dispatch('getLogout')
          next('/login')
        }
      }
    }
  }else{
    //没有token
    if(to.path=='/shopcart'||to.path=='/addcartsuccess'||to.path=='/trade'||to.path.indexOf('pay')!=-1||to.path.indexOf('/center')!=-1){
      next('/login?redirect='+to.path)
    }
    next()  
  }
})

export default router
