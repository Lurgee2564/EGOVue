import { createRouter, createWebHistory } from 'vue-router'

import login from "@/components/Login";
import user from "@/components/User";
import main from "@/components/Main";


const routes = [


  {
    path: '/home',
    name: 'home',
    component: ()=>import('../components/HomeView'),
    children:[
      {
        path: 'user',
        name: 'user',
        component:()=>import('@/components/User')

      },
      {
        path:"main",
        name:'main',
        component: () => import('../components/Main')
      }
    ]
  },
  {
    path: '/',
    name:'login',
    component:login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
