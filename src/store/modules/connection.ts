import { defineStore } from 'pinia'
import { MeiliSearch, Config } from 'meilisearch'

type connections = {
	[key: string]: MeiliSearch
}

interface ConnectionPool {
	connections: connections
}

export const useConnectionPool = defineStore('connection', {
	state: () => {
		return {
			connections: {},
		} as ConnectionPool
	},
	actions: {
		connect(key: string, config: Config) {
			this.connections[key] = new MeiliSearch(config)
		},
		client(key: string): MeiliSearch {
			return this.connections[key]
		},
	},
	getters: {
		clients(): connections {
			return this.connections
		},
	},
})
