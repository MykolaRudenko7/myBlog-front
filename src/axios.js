import axios from "axios";
//
//
//
//
//
const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL
})

// ф-ція перевіряє чи є токін
instance.interceptors.request.use((config)=> {
	config.headers.Authorization = window.localStorage.getItem('token')
	return config
})

export default instance;