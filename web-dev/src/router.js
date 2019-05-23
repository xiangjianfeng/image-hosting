import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Option from "./views/Option.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/option",
      name: "option",
      component: Option
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
