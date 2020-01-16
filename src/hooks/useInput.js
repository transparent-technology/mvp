import React, { useState, useEffect } from "react"
import { Input } from "antd"

const labels = {
  cellphone: "Контактный номер",
  department: "Отдел",
  email: "Адрес электронной почты (логин)",
  firstName: "Имя",
  lastName: "Фамилия",
  middleName: "Отчество",
  number: "Внутренний номер сотрудника",
  position: "Должность",
  companyName: "Название"
}

export const useInput = ({
  name,
  value = "",
  inputProps = {},
  label = null
}) => {
  const [inputValue, setInputValue] = useState("")

  useEffect(() => setInputValue(value), [value])

  return {
    input: (
      <label>
        <span>{label || labels[name]}</span>
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          size="large"
          {...inputProps}
        />
      </label>
    ),
    get: () => ({ [name]: inputValue })
  }
}
