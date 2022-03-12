import axios from 'axios'

export default axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3333/' : ''
})