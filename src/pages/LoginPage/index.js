import React, { useState, useEffect } from "react"
import styled from "reshadow/macro"

import { Input, Button } from "antd"

import sqr_bl from "assets/sqr_bl.svg"
import sqr_gr from "assets/sqr_gr.svg"
import logo from "assets/logo.svg"
import logo_text from "assets/logo_text.svg"

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
        .then(() => history.push("/tasks?GroupType=Executing"))
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
      height: 100vh;
      padding-top: 15vh;
      background: ${`url(${sqr_bl})`} no-repeat,
      ${`url(${sqr_gr})`} no-repeat bottom right;
      background-color: ${p => p.theme.bg.main};
      position: relative;
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

    logo {
      position: absolute;
      display: flex;
      align-items: center;
      top: 60px;
      left: 90px;

      & img {
        margin-left: 16px;
      }
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
      <logo>
        <img src={logo} alt="logo" />
        <img src={logo_text} alt="discription logo" className="logo_text" />
      </logo>
    </loginpage>
  )
}
