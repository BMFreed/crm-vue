import Vue from "vue";
import App from "./App.vue";
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";
import "./registerServiceWorker";
import router from "./router";
import "materialize-css/dist/js/materialize.min";

Vue.component("empty-layout", EmptyLayout);
Vue.component("main-layout", MainLayout);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
