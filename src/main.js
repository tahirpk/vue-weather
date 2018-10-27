import 'bootstrap'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Search from './Search.vue'
import Home from './Home.vue'

Vue.use(VueRouter)

let routes =[
	{ path: '/search/' , component: Search },
	{ path: '/' , component: Home }
]

import numFormat from 'vue-filter-number-format';
Vue.filter('numFormat', numFormat);


const router = new VueRouter({ 
	mode: 'history',
	routes
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


window.Fire = new Vue