import axios from "axios"

export const auth = axios.create({
  baseURL: "https://transparent-staging.herokuapp.com/api/Auth"
})

auth.interceptors.response.use(res => {
  const { data } = res
  const {
    successResponse: { token, refreshToken, roles }
  } = data

  localStorage.setItem("token", JSON.stringify(token))
  localStorage.setItem("refreshToken", JSON.stringify(refreshToken))
  localStorage.setItem("roles", JSON.stringify(roles))
}, Promise.reject)

export const method = axios.create({
  baseURL: "https://transparent-staging.herokuapp.com/api"
})

method.interceptors.request.use(req => {
  req.headers["Authorization"] = `Bearer ${JSON.parse(
    localStorage.getItem("token")
  )}`
  return req
}, Promise.reject)

method.interceptors.response.use(
  res => res.data.successResponse,
  err  => {
    if(err.response.status === 401) {
      const token = JSON.parse(localStorage.getItem('token'))
      const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
      auth.post('refreshToken', {token, refreshToken}).then(() => {
        console.log('refresh')
        return method(err.response.config)
      })
    }
    return Promise.reject(err)
  }
)
