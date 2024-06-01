import { $axios } from '/src/api'

class ExpenseService {
	async add(params) {
		try {
			const { data } = await $axios.post(`/expense/`, params, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})

			return data
		} catch (error) {
			console.error(error)
			throw new Error(error)
		}
	}
	async getTypeList() {
		try {
			const { data } = await $axios.get(`/expense/type/`)

			return data
		} catch (error) {
			console.error(error)
			throw new Error(error)
		}
	}
	async getCurrentList() {
		try {
			const { data } = await $axios.get(`/expense/`)

			return data
		} catch (error) {
			console.error(error)
			throw new Error(error)
		}
	}
}

export default new ExpenseService()
