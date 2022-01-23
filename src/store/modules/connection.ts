import { defineStore } from 'pinia'
import { MeiliSearch, Config, IndexResponse } from 'meilisearch'

type connections = {
	[key: string]: Connection
}

interface Connection {
	key: string
	client: MeiliSearch
	indexes: IndexResponse[]
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
			this.connections[key] = {
				key: key,
				client: new MeiliSearch(config),
				indexes: [],
			}
		},
		client(key: string): MeiliSearch {
			return this.connections[key].client
		},
		async getIndexes(key: string) {
			this.connections[key].indexes = await this.client(key).getIndexes()
		},
	},
	getters: {},
})
