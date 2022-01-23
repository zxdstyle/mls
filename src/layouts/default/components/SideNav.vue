<template>
	<aside class="pt-8 border-r border-slate-900">
		<header class="flex items-center justify-between p-3 border-b border-zinc-900">
			<SettingOutlined class="cursor-pointer hover:text-primary text-lg" />
			<HomeOutlined class="cursor-pointer hover:text-primary text-xl" />
		</header>
		<Menu @click="onHandleClick" mode="inline" theme="dark" :selected-keys="selectedKeys" :selectable="false" class="px-4">
			<SubMenu v-for="con in connections" :key="con.key">
				<template #title>{{ con.key }}</template>
				<MenuItem v-for="index in con.indexes" :key="'/' + con.key + '/' + index.name">{{ index.name }}</MenuItem>
			</SubMenu>
		</Menu>
	</aside>
</template>

<script lang="ts">
	import { computed, defineComponent, reactive, toRefs } from 'vue'
	import { Menu } from 'ant-design-vue'
	import { useRouter, useRoute } from 'vue-router'
	import { useConnectionPool } from '@/store/modules/connection'
	import { SettingOutlined, HomeOutlined } from '@ant-design/icons-vue'

	const MenuItem = Menu.Item
	const SubMenu = Menu.SubMenu
	export default defineComponent({
		name: 'SideNav',
		components: { SettingOutlined, HomeOutlined, MenuItem, SubMenu, Menu },
		setup() {
			const route = useRoute()
			const router = useRouter()
			const onHandleClick = (e: { key: string }) => {
				console.log(e)
				router.push({ path: e.key })
			}

			const pool = useConnectionPool()
			pool.connect('test', { host: 'http://127.0.0.1:7700' })

			const state = reactive({
				health: {},
			})

			const connect = async (key: string) => {
				state.health = await pool.client(key).health()
			}
			connect('test')

			let connections = computed(() => pool.connections)

			const selectedKeys = computed(() => {
				return [route.name ?? connections.value[0]]
			})

			pool.getIndexes('test')

			return { ...toRefs(state), connections, onHandleClick, selectedKeys }
		},
	})
</script>

<style lang="less" scoped>
	aside {
		-webkit-app-region: drag;
	}
</style>
