import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import MainLayout from "../layout/MainLayout.vue";
import Dashboard from "../views/Dashboard.vue";
import UserManagement from "../views/user/UserManagement.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "dashboard", component: Dashboard },
      { path: "users", component: UserManagement },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
