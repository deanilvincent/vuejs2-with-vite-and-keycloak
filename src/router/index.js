import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/about",
      name: "about",
      meta: {
        role: ["admin"],
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiredRoles = to.meta.role;
  if (requiredRoles?.length > 0 && Vue.$keycloak.authenticated) {
    const userRole = Vue.$keycloak.tokenParsed.resource_access["app-vue"].roles;
    if (
      //if user is admin or member
      userRole.some((p) => p === "admin") ||
      userRole.some((p) => p === "member")
    ) {
      if (requiredRoles?.length > 0) {
        // basically, we compare if the user role is anywhere in the required roles for a current route
        let isAllowed = false;
        requiredRoles.some((x)=>{
          if(userRole.some(y=> y === x)){
             isAllowed = true
             // stops the loop
             return true;
          }
        })
        if (isAllowed) {
          return next();
        } else {
          alert("Unauthorized"); // or navigate to unauthorized page
          return;
        }
      }

      return next();
    } else {
      alert("Unauthorized"); // or navigate to unauthorized page
      return;
    }
  } else {
    return next();
  }
});

export default router;
