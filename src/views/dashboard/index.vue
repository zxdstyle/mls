<template>
	<div>{{ health }}</div>
	<div v-for="client in clients">{{ client }}</div>
</template>

<script lang="ts">
	import { mapState } from 'pinia'
	import { defineComponent, reactive, computed, toRefs } from 'vue'
	import { useConnectionPool } from '@/store/modules/connection'

	export default defineComponent({
		components: {},
		props: {},
		setup() {
			const pool = useConnectionPool()
			pool.connect('test', { host: 'http://127.0.0.1:7700', apiKey: 'masterKey' })

			const state = reactive({
				health: {},
			})

			const connect = async (key: string) => {
				state.health = await pool.client(key).health()
			}
			connect('test')

			let clients = computed(() => pool.clients)

			return { ...toRefs(state), clients }
		},
	})
</script>

<style lang="less" scoped></style>
