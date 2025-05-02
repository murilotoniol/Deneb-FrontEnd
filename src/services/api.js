import axios from 'axios'

const api = axios.create({
	baseUrl: 'http://localhost:8090'
})

export default api