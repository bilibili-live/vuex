import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const home = 'todo/index'

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: ()=> import(`_p/${ home }.vue`)
    }
  ]
})

export default router