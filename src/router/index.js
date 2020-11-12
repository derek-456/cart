import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/home.vue";
import Weitao from "../components/weitao.vue";
import Message from "../components/message.vue";
import Cart from "../components/cart.vue";
import User from "../components/user.vue";

Vue.use(VueRouter);

const routes = [
	{ path: "/", redirect: "/cart" },
	{ path: "/home", component: Home },
	{ path: "/weitao", component: Weitao },
	{ path: "/message", component: Message },
	{ path: "/cart", component: Cart },
	{ path: "/user", component: User },
];
const router = new VueRouter({
	routes,
	linkActiveClass: "my-active",
});
export default router;
