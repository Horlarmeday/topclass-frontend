/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)

// socket
// import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client'

// axios
import axios from "./axios.js"
Vue.prototype.$http = axios


// Theme Configurations
import '../themeConfig.js'

// ACL
import acl from './acl/acl'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'

// VeeValidate
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('./assets/css/iconfont.css')

Vue.use(require('vue-moment'));

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://localhost:4050', {
//     withCredentials: true,
    
//   }), 
//   vuex: {
//     store,
//     actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_'
//   },
// }))


Vue.config.productionTip = false

new Vue({
    router,
    store,
    acl,
    render: h => h(App)
}).$mount('#app')
