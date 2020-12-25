import Vue from 'vue'
import VueRouter from 'vue-router'
import LRindex from '../views/LRindex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/LRindex"
  },
  {
    path: '/LRindex',
    name: 'LRindex',
    component: LRindex
  },
  {
    path: '/admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      requireAuth: true
    },
    name: 'Admin', children: [
      {
        path: '',
        component: () => import('@/components/admin/homepage.vue'),
        meta: {
          requireAuth: true
        }
      }, {
        path: 'homepage',
        component: () => import('@/components/admin/homepage.vue'),
        meta: {
          requireAuth: true
        }
      }, {
        path: 'add-wx',
        component: () => import('@/components/admin/add-wx.vue'),
        meta: {
          requireAuth: true
        }
      }, {
        path: 'binding',
        component: () => import('@/components/admin/binding.vue'),
        meta: {
          requireAuth: true
        }
      }
    ]

  },
  {
    path: '/commom',
    name: 'Commom',
    component: () => import('../views/Commom.vue'),
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)

  if (to.meta.requireAuth) {
    if (sessionStorage.getItem('ybusername') === "dragon") {
      next()
    } else {
      next({
        path: '/LRindex'
      })
    }
  } else {
    next()
  }

})

export default router
