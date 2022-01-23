<template>
	<div>
		<table>
			<tr v-for="attr in attributes" :key="attr">
				<td>{{ attr }}</td>
			</tr>
			<tr v-for="datum in data" :key="datum.id">
				<td v-for="attr in attributes" :key="attr">{{ datum[attr] }}</td>
			</tr>
		</table>
	</div>
</template>

<script lang="ts">
	import { useRoute } from 'vue-router'
	import { useConnectionPool } from '@/store/modules/connection'
	import { defineComponent, reactive, toRefs } from 'vue'

	interface state {
		data: any[]
		attributes: string[]
	}

	export default defineComponent({
		components: {},
		props: {},
		setup() {
			const route = useRoute()
			const pool = useConnectionPool()

			const index = route.params.index as string
			const connect = route.params.connect as string

			const state: state = reactive({
				data: [],
				attributes: [],
			})

			const getIndex = async () => {
				let db = await pool.client(connect).getIndex(index)
				state.data = await db.getDocuments({ limit: 20 })
				state.attributes = Object.keys(state.data[0])
			}
			getIndex()

			return { ...toRefs(state), connect, index }
		},
	})
</script>

<style lang="less" scoped></style>
