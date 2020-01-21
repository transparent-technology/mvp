/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import styled from "reshadow/macro"
import { Link } from "react-router-dom"

import { method } from "services/api"
import { Button as AntButton } from "antd"
import { paper, breadcrumbs } from "styles"
import { useInput } from "hooks"
import { Input } from "components"

export const UserTemplate = ({ match, history }) => {
  const { userId } = match.params
  console.log(userId)
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    middleName: "",
    cellphone: "",
    department: "",
    position: "",
    number: "",
    userRoles: []
  })
  const [changeSettings, setChangeSettings] = useState(false)

  const lastName = useInput({ name: "lastName", value: user.lastName })
  const firstName = useInput({ name: "firstName", value: user.firstName })
  const middleName = useInput({ name: "middleName", value: user.middleName })
  const department = useInput({ name: "department", value: user.department })
  const position = useInput({ name: "position", value: user.position })
  const number = useInput({ name: "number", value: user.number })
  const email = useInput({ name: "email", value: user.email })
  const cellphone = useInput({ name: "cellphone", value: user.cellphone })
  const password = useInput({
    name: "password",
    value: user.password,
    label: "Пароль"
  })
  const passwordRepeat = useInput({
    name: "password",
    value: user.password,
    label: "Повторите пароль"
  })

  useEffect(() => {
    if (userId !== "create") {
      method.get(`ManagingFirmUsers/${userId}`).then(setUser)
    }
  }, [userId])

  useEffect(() => {
    if (changeSettings) {
      console.log(user)
      method.put(`ManagingFirmUsers/${userId}`, user).then(console.log)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeSettings])

  console.log(lastName.get())

  return styled(paper, breadcrumbs)`
    paper {
      grid-template-columns: 1fr 1fr 1fr;

      & > :nth-child(9),
      & > :last-child {
        grid-column: 1 / -1;
      }
    }

    AntButton + AntButton {
      margin-left: 16px;
    }
  `(
    <>
      <breadcrumbs>
        <Link to="/company#users">Профиль компании</Link>
      </breadcrumbs>
      <h1>
        {userId !== "create"
          ? `${user.firstName} ${user.lastName}`
          : "Добавление нового сотрудника"}
      </h1>
      <paper>
        <input />
        {/* <Input /> */}
        {/* {lastName.input}
        {firstName.input}
        {middleName.input}
        {department.input}
        {position.input}
        {number.input}
        {email.input}
        {cellphone.input}
        <label>
          <span>Роль в системе</span>
        </label>
        {password.input}
        {passwordRepeat.input} */}
        {/* <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input /> */}
        <div>
          <AntButton
            size="large"
            type="primary"
            onClick={() => setChangeSettings(true)}
          >
            Сохранить
          </AntButton>
          <AntButton size="large" onClick={() => history.goBack()}>
            Отмена
          </AntButton>
        </div>
      </paper>
    </>
  )
}
