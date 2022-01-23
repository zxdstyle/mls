import { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('@/layouts/default/index.vue'),
		children: [
			{
				path: '/:connect/:index',
				name: 'data',
				component: () => import('@/views/data/index.vue'),
			},
		],
	},
]

export default routes
