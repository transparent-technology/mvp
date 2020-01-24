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

export const transformDate = (time = "") => {
  const days = Math.abs(time) / 1000 / 60 / 60 / 24
  const hours = (days - (days >> 0)) * 24
  const minutes = (hours - (hours >> 0)) * 60

  if (days >> 0) {
    return `${days >> 0}д ${hours >> 0}ч`
  } else if (hours >> 0) {
    return `${hours >> 0}ч ${minutes >> 0}м`
  } else {
    return `${minutes >> 0}м`
  }
}
