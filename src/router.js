// import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("./pages/Homepage.vue"),
    name: "home",
    meta: {
      layout: "Base",
      load: true
    }
  },
  {
    path: "/:notFound*",
    name: "404",
    component: () => import("./pages/Page404.vue"),
    meta: {
      layout: "FullPage"
    }
  }
];

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
// });

// export default router;

import {
  // createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from "vue-router";

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: createWebHistory(),
    routes
  });
}