// import { createRouter, createWebHistory } from "vue-router";
import mafia from "@/modules/mafia";

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
			guard: "active_game"
		}
	},
	{
		path: "/mafia/users",
		component: () => import("./pages/Mafia/Users.vue"),
		name: "mafia-users",
		meta: {
			layout: "mafia",
			guard: "active_game"
		}
	},
	{
		path: "/mafia/roles",
		component: () => import("./pages/Mafia/Roles.vue"),
		name: "mafia-roles",
		meta: {
			layout: "mafia",
			guard: "active_game"
		}
	},
	{
		path: "/mafia/setting",
		component: () => import("./pages/Mafia/Setting.vue"),
		name: "mafia-setting",
		meta: {
			layout: "mafia",
		}
	},
	{
		path: "/mafia/start/set-roles",
		component: () => import("./pages/Mafia/SetRoles.vue"),
		name: "mafia-start-set-roles",
		meta: {
			layout: "mafia",
			guard: "active_game"
		}
	},
	{
		path: "/mafia/start/assign-roles",
		component: () => import("./pages/Mafia/AssignRoles.vue"),
		name: "mafia-start-assign-roles",
		meta: {
			layout: "mafia",
			guard: "active_game"
		}
	},
	{
		path: "/mafia/game",
		component: () => import("./pages/Mafia/Game.vue"),
		name: "mafia-game",
		meta: {
			layout: "mafia",
		}
	},
	{
		path: "/mafia/game-guard",
		component: () => import("./pages/Mafia/GameGuard.vue"),
		name: "mafia-game-guard",
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
	const router = _createRouter({
		// use appropriate history implementation for server/client
		// import.meta.env.SSR is injected by Vite.
		history: createWebHistory(),
		routes
	});
	let data = new mafia();
	router.beforeEach((to, from) => {
		let savedGame = data.getGame();
		if (savedGame != undefined && savedGame?.end === false) {
			if (to.meta.guard == "active_game") {
				return { name: 'mafia-game-guard' }
			}
			// return false
		}
		// ...
		// explicitly return false to cancel the navigation
		// return false
	})

	return router;
}

