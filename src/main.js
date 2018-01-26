import Vue from 'vue'
import VueFire from 'vuefire'

import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import firebase from 'firebase'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'

Vue.use(BootstrapVue)
Vue.use(VueFire)

Vue.component('icon', Icon)


new Vue({
  el: '#app',
  render: h => h(App)
})
