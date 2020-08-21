import Vue from 'vue';
import VueRouter from 'vue-router';
import Brand from "./components/pages/BrandComponent";
import NotFound from "./components/pages/NotFoundComponent";


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
		{
		name: 'brand',
		path: '/',
		component: Brand
		},
		{
		name: '404',
		path: '/*',
		component: NotFound
		}
	]
});

export default router
