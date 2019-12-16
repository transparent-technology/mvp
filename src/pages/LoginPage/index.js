import React, { useState, useEffect } from "react"
import styled from "reshadow/macro"

import Input from "antd/es/input"
import Button from "antd/es/button"

import { auth } from "services/api"

export const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [data, setData] = useState(null)
  const [loadign, setLoading] = useState(false)

  useEffect(() => {
    let mount = true
    if (data) {
      setLoading(true)
      auth
        .post("login", data)
        .then(() => history.push("/tasks"))
        .finally(() => mount && setLoading(false))
    }
    return () => (mount = false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const submit = e => {
    e.preventDefault()
    setData({ email, password })
  }

  return styled`
  loginpage {
    heigth: 100vh;
    padding-top: 15vh;
    }

    h1{ 
      font-size: 38px;
      font-weight: 300;
      text-align: center;
      margin-bottom: 32px;
    }

    form {
      max-width: 320px;
      margin: auto;
      display: grid;
      grid-row-gap: 24px;
    }

    Button {
      margin-top: 8px;
    }
  `(
    <loginpage>
      <h1>Вход в систему</h1>
      <form onSubmit={submit}>
        <label>
          <span>Логин</span>
          <Input
            size="large"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Пароль</span>
          <Input.Password
            size="large"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <Button
          size="large"
          block
          type="primary"
          htmlType="submit"
          disabled={!email || !password}
          loading={loadign}
        >
          Вход в систему
        </Button>
      </form>
    </loginpage>
  )
}
