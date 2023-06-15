// import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		component: () => import("./pages/Homepage.vue"),
		name: "home",
		meta: {
			layout: "home",
		}
	},
	{
		path: "/mafia",
		component: () => import("./pages/Mafia/Index.vue"),
		name: "mafia",
		meta: {
			layout: "mafia",
		}
	},
	{
		path: "/mafia/users",
		component: () => import("./pages/Mafia/Users.vue"),
		name: "mafia-users",
		meta: {
			layout: "mafia",
		}
	},
	{
		path: "/mafia/roles",
		component: () => import("./pages/Mafia/Roles.vue"),
		name: "mafia-roles",
		meta: {
			layout: "mafia",
		}
	},
	{
		path: "/:notFound*",
		name: "404",
		component: () => import("./pages/Page404.vue"),
		meta: {
			layout: "Home"
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