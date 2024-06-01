import { $axios } from '/src/api.js'

class VocabularyService {
	async getByKey(key) {
		try {
			const { data } = await $axios.get(`/vocabulary/${key}`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new VocabularyService()
