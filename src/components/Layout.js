import React, { useState, useEffect } from "react"
import { NavLink, useHistory, Redirect } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import logo from "assets/logo.svg"
import { Icon } from "components"
import { method } from "services/api"

const styles = css`
  layout {
    display: grid;
    grid-template-columns: 208px 1fr;
    height: 100vh;
    color: #272f5a;
  }

  aside {
    background: #fff;
  }

  main {
    padding: 0 56px;
    display: inherit;
    grid-row-gap: 24px;
    align-content: start;
    overflow-y: scroll;
  }

  nav {
    display: flex;
    flex-direction: column;
  }

  logo {
    height: 64px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 300;

    & > img {
      margin-left: -28px;
      margin-right: 12px;
    }
  }
`

const navlink = css`
  NavLink {
    display: flex;
    align-items: center;
    height: 48px;
    padding-left: 18px;
    position: relative;

    &::before {
      content: "";
      display: block;
      width: 2px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
    }

    &:last-child {
      margin-top: 32px;
    }
  }

  Icon {
    margin-right: 12px;
  }

  .active {
    color: #189ee9;
    background: rgba(0, 194, 255, 0.15);
    &::before {
      background: #189ee9;
    }
  }
`

const getUserRole = () => {
  const roles = JSON.parse(localStorage.getItem("roles"))
  return roles ? roles : []
}

export const Layout = ({ children }) => {
  const [startLogout, setStartLogout] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (startLogout) {
      const token = JSON.parse(localStorage.getItem("token"))
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken"))
      method.post("Auth/logout", { token, refreshToken }).then(() => {
        localStorage.clear()
        history.push("/login")
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLogout])

  const logout = e => {
    e.preventDefault()
    setStartLogout(true)
  }

  const isAdmin = getUserRole().includes("ManagingFirmAdministrator")

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />
  }

  return styled(
    styles,
    navlink
  )(
    <layout>
      <aside>
        <logo>
          <img src={logo} alt="logo" />
          <span>
            <b>TT</b> Management
          </span>
        </logo>
        <nav>
          <NavLink to="/tasks#Executing" activeClassName={navlink.active}>
            <Icon type="task" />
            Задачи
          </NavLink>
          <NavLink to="/objects" activeClassName={navlink.active}>
            <Icon type="object" />
            Объекты
          </NavLink>
          <NavLink to="/profile" activeClassName={navlink.active}>
            <Icon type="username" />
            Настройки профиля
          </NavLink>
          {isAdmin && (
            <NavLink to="/company" activeClassName={navlink.active}>
              <Icon type="company" />
              Профиль компании
            </NavLink>
          )}
          <NavLink
            to="/login"
            activeClassName={navlink.active}
            onClick={logout}
          >
            <Icon type="exit" />
            Выход
          </NavLink>
        </nav>
      </aside>
      <main>{children}</main>
    </layout>
  )
}
