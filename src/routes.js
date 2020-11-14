import Login from "./components/Login.vue";
import Registeration from "./components/Registeration.vue";
import Dashboard from "./components/Dashboard.vue";

export default [
  { path: "/", component: Login },
  { path: "/login", component: Login },
  { path: "/register", component: Registeration },
  { path: "/dashboard", component: Dashboard },
];