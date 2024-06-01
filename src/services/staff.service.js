import { $axios } from '/src/api.js'

class StaffService {
	async getUser() {
		try {
			const { data } = await $axios.get(`/staff/`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new StaffService()
