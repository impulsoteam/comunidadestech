import { toast } from 'react-toastify'

import axios from 'axios'
import Cookies from 'js-cookie'
import Router from 'next/router'

export const api = axios.create({
  baseURL: '/api/v1'
})

const notify = () => {
  if (toast.isActive('invalidToken')) return
  toast.warn('Sessão expirada. Você será redirecionado para página de login!', {
    toastId: 'invalidToken'
  })
}

api.interceptors.response.use(response => response,
  error => {
    const { status, data } = error.response
    if (status === 401 && data.error === 'invalid token') {
      notify()
      Cookies.remove('ctech_credentials')
      setTimeout(() => Router.push('/sign-in?previousPage=dashboard'), 4000)
    }
    return Promise.reject(error.response)
  }
)

export const setHeader = ({ token }) => {
  api.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}
