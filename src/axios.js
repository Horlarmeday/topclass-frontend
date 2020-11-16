// axios
import axios from 'axios'


const token = localStorage.getItem('user-token')
axios.defaults.baseURL = '/api'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
axios.defaults.timeout = 180000

export default axios;
