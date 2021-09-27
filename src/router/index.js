import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Categories from "@/views/Categories";
import DetailRecord from "@/views/DetailRecord";
import History from "@/views/History";
import Planning from "@/views/Planning";
import Profile from "@/views/Profile";
import Record from "@/views/Record";
import Register from "@/views/Register";

Vue.use(VueRouter);

const meta = {
  regAuth: {
    layout: "empty"
  },
  main: {
    layout: "main",
    auth: true
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    meta: meta.main,
    component: Home
  },
  {
    path: "/login",
    name: "login",
    meta: meta.regAuth,
    component: Login
  },
  {
    path: "/register",
    name: "register",
    meta: meta.regAuth,
    component: Register
  },
  {
    path: "/categories",
    name: "categories",
    meta: meta.main,
    component: Categories
  },
  {
    path: "/detail-record/:id",
    name: "detail-record",
    meta: meta.main,
    component: DetailRecord
  },
  {
    path: "/history",
    name: "history",
    meta: meta.main,
    component: History
  },
  {
    path: "/planning",
    name: "planning",
    meta: meta.main,
    component: Planning
  },
  {
    path: "/profile",
    name: "profile",
    meta: meta.main,
    component: Profile
  },
  {
    path: "/record",
    name: "record",
    meta: meta.main,
    component: Record
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.auth);

  if (requiresAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
