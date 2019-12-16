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

method.interceptors.request.use(req => req, Promise.reject)
