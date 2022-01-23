<template>
	<nav></nav>
	<div class="grid grid-cols-12 min-h-screen text-gray-400">
		<SideNav class="col-span-3" />

		<main class="col-span-9 bg-slate-900 w-full h-screen">
			<router-view />
		</main>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import SideNav from './components/SideNav.vue'

	export default defineComponent({
		name: 'Index',
		components: { SideNav },
		setup() {},
	})
</script>

<style lang="less" scoped>
	nav {
		position: fixed;
		top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 36px;
		width: 100%;
		z-index: 100;
		-webkit-app-region: drag;
	}
</style>
