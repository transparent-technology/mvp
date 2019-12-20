import { useEffect } from "react"

export const useTimer = finish => {
  // const current = new Date(finish).getTime() - Date.now()
  let day

  useEffect(() => {
    const timer = () => setInterval(() => {}, 1000)
    timer()
  }, [])

  // const hour = new Date(tick).getHours()
  // const minute = new Date(tick).getMinutes()
  // const seconds = new Date(tick).getSeconds()

  // if (finishDate - Date.now() < 0) return "потрачено"

  if (day) return `${day}д`

  return "загрузка..."
}
