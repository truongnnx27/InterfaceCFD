import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const SUCCESS_CODE = 20000
const TOKEN_ERROR_CODES = [50008, 50012, 50014]

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || 'http://localhost:3000', // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      const token = getToken()
      if (token) {
        config.headers['X-Token'] = encodeURIComponent(token)
      }
    }
    return config
  },
  error => {
    // do something with request error
    Message({
      message: error.message || 'Request error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== SUCCESS_CODE) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (TOKEN_ERROR_CODES.includes(res.code)) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
