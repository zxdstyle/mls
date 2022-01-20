import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'dashboard',
		component: () => import('@/views/dashboard/index.vue'),
	},
]

export default routes
