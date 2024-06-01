import { $axios } from '/src/api.js'

class TableService {
	async getByKey(key) {
		try {
			const { data } = await $axios.get(`/table/${key}`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}

	async getData(key) {
		try {
			const { data } = await $axios.get(`/table/${key}/all`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}

	async getElement(key, id) {
		try {
			const { data } = await $axios.get(`/table/${key}/${id}`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}

	async addEntity(key, params) {
		try {
			const { data } = await $axios.post(`/table/${key}/add`, params)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
	async updateEntity(key, id, params) {
		try {
			const { data } = await $axios.put(`/table/${key}/${id}`, params)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
	async deleteElement(key, id) {
		try {
			const { data } = await $axios.delete(`/table/${key}/${id}`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new TableService()
