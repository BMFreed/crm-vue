import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Categories from "@/views/Categories";
import DetailRecord from "@/views/DetailRecord";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    meta: {
      layout: "empty"
    },
    component: Login
  },
  {
    path: "/categories",
    name: "categories",
    meta: {
      layout: "main"
    },
    component: Categories
  },
  {
    path: "/detail-record",
    name: "detail-record",
    meta: {
      layout: "main"
    },
    component: DetailRecord
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
