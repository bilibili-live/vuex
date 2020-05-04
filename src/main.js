import Vue from 'vue'
import Click from 'vue-spark'
import app from './App.vue'
import store from './store'
import router from './routers'
import './plugins/element'

Vue.config.productionTip = false
Vue.directive('click', Click)

const App = new Vue({
  router,
  store,
  render: h => h(app),
}).$mount('#app')