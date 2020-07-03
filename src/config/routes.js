/* 
自定义项目中所有路由的配置
*/
import Welcome from '@/pages/Welcome'
import Frontend from '@/pages/Welcome/Frontend'
import Backend from '@/pages/Welcome/Backend'

import Pins from '@/pages/Pins'
import Following from '@/pages/Pins/Following'
import Hot from '@/pages/Pins/Hot'

import Books from '@/pages/Books'
import BooksBackend from '@/pages/Books/Backend'
import BooksFrontend from '@/pages/Books/Frontend'

export default [
  {
    path: '/welcome', // 路由路径
    component: Welcome, // 路由组件
    name: '首页', // 对应的路由链接文本
    children: [ // 下一级所有路由的数组
      {
        path: '/welcome/frontend', 
        component: Frontend, 
        name: '前端', 
      },
      {
        path: '/welcome/backend', 
        component: Backend, 
        name: '前端', 
      }
    ] 
  },

  {
    path: '/pins',
    component: Pins,
    name: '沸点',
    children: [
      {
        path: '/pins/frontend',
        component: Following,
        name: '关注',
      },
      {
        path: '/pins/hot',
        component: Hot,
        name: '热点',
      },
    ]
  },

  {
    path: '/books',
    component: Books,
    name: '小册',
    children: [
      {
        path: '/books/frontend',
        component: BooksBackend,
        name: '前端',
      },
      {
        path: '/books/backend',
        component: BooksFrontend,
        name: '后端',
      },
    ]
  }
]