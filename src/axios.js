import axios from "axios";
//
//
//
//
//
const instance = axios.create({
	baseURL: 'http://localhost:7777'
})

// ф-ція перевіряє чи є токін
instance.interceptors.request.use((config)=> {
	config.headers.Authorization = window.localStorage.getItem('token')
	return config
})

export default instance;