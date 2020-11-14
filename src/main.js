import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import Routes from "./routes.js";
import Vuelidate from 'vuelidate'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import axios from "axios";

axios.defaults.baseURL = "https://localhost:44392/api";

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: Routes
});
new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
