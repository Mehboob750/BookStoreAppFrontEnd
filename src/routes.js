import Login from "./components/Login.vue";
import Registeration from "./components/Registeration.vue";
import Dashboard from "./components/Dashboard.vue";
import AddBook from "./components/AddBook.vue";
import UpdateBook from "./components/UpdateBook.vue";

function guardRoute(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem("Token")) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
}

export default [
  { path: "/", component: Login },
  { path: "/login", component: Login },
  { path: "/register", component: Registeration },
  { path: "/dashboard", component: Dashboard, beforeEnter: guardRoute},
  { path: "/dashboard/addBook", component: AddBook, beforeEnter: guardRoute },
  { path: "/dashboard/updateBook/:bookId", component: UpdateBook, beforeEnter: guardRoute },
  // {
  //   path: "/dashboard",
  //   component: Dashboard,
  //   beforeEnter: guardRoute,
  //   children: [
  //     { path: "/addBook", component: AddBook }
  //   ]
  // },
];