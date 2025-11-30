import axios from 'axios' // 🟢 BẮT BUỘC PHẢI CÓ DÒNG NÀY

const api = axios.create({
  baseURL: '/'
})

export default api
