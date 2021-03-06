import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";
import Loader from "@/components/app/Loader";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import messagePlugin from "@/utils/message.plugin";
import tooltipDirective from "@/utils/tooltip.directive";
import Paginate from "vuejs-paginate";
import "firebase/auth";
import "firebase/database";
import "materialize-css/dist/js/materialize";
import "./registerServiceWorker";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.directive("tooltip", tooltipDirective);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);
Vue.config.productionTip = false;

Vue.component("empty-layout", EmptyLayout);
Vue.component("main-layout", MainLayout);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyD3EQn6heiHBkgpjDw0JEmGrLox0PUAcNY",
  authDomain: "crm-vue-8f01c.firebaseapp.com",
  projectId: "crm-vue-8f01c",
  storageBucket: "crm-vue-8f01c.appspot.com",
  messagingSenderId: "682686079975",
  appId: "1:682686079975:web:87cbda058c874a84611342",
  measurementId: "G-5X7BY3Y6WD",
  databaseURL:
    "https://crm-vue-8f01c-default-rtdb.europe-west1.firebasedatabase.app"
});

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
