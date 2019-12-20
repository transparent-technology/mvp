export const formatedDate = (value = "", props = {}) => {
  const { time } = props

  const options = {
    year: "2-digit",
    month: "numeric",
    day: "numeric"
  }

  const optionsTime = {
    hour: "numeric",
    minute: "numeric"
  }

  const currentFormat = time ? { ...options, ...optionsTime } : options

  return new Date(value).toLocaleDateString("ru", currentFormat)
}
