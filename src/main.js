import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";
import router from "./router";
import dateFilter from "@/filters/date.filter";
import "materialize-css/dist/js/materialize";
import "./registerServiceWorker";

Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.config.productionTip = false;

Vue.component("empty-layout", EmptyLayout);
Vue.component("main-layout", MainLayout);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
