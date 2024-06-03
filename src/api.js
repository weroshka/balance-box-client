import axios from 'axios'
import Cookies from 'js-cookie'

import { TOKEN } from './app.constants'

// const API_URL = `http://localhost:3000/api`
const API_URL = `http://90.156.229.25:3781/api`

export const $axios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: Cookies.get(TOKEN) ? `Bearer ${Cookies.get(TOKEN)}` : ''
	}
})
