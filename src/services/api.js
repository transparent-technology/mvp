import axios from "axios"

const server = process.env.NODE_ENV === "production" ? "production" : "staging"

export const auth = axios.create({
  baseURL: `https://transparent-${server}.herokuapp.com/api/Auth`
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
  baseURL: `https://transparent-${server}.herokuapp.com/api`,
  headers: { "Content-Type": "application/json" }
})

method.interceptors.request.use(req => {
  req.headers["Authorization"] = `Bearer ${JSON.parse(
    localStorage.getItem("token")
  )}`
  return req
}, Promise.reject)

method.interceptors.response.use(
  res => res.data.successResponse,
  err => {
    if (err.response.status === 401) {
      const token = JSON.parse(localStorage.getItem("token"))
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken"))
      return method
        .post("Auth/refreshToken", { token, refreshToken })
        .then(res => {
          const { token, refreshToken } = res
          localStorage.setItem("token", JSON.stringify(token))
          localStorage.setItem("refreshToken", JSON.stringify(refreshToken))
        })
        .then(() => method(err.config))
        .catch(() => {
          localStorage.clear()
          window.location.replace("/login")
        })
    }
    return Promise.reject(err)
  }
)
