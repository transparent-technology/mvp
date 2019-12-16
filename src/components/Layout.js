import React from "react"
import { NavLink } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import logo from "assets/logo.svg"

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
    padding: 24px 56px;
    display: inherit;
    grid-row-gap: 24px;
    align-content: start;
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

  .active {
    color: #189ee9;
    background: rgba(0, 194, 255, 0.15);
    &::before {
      background: #189ee9;
    }
  }
`

export const Layout = ({ children }) => {
  return styled(
    styles,
    navlink
  )(
    <layout>
      <aside>
        <logo>
          <img src={logo} alt="logo" />
          <span>
            <b>TT</b> Managment
          </span>
        </logo>
        <nav>
          <NavLink to="/tasks#Executing" activeClassName={navlink.active}>
            Задачи
          </NavLink>
          <NavLink to="/objects" activeClassName={navlink.active}>
            Объекты
          </NavLink>
          <NavLink to="/settings" activeClassName={navlink.active}>
            Профиль компании
          </NavLink>
          <NavLink to="/login" activeClassName={navlink.active}>
            exit
          </NavLink>
        </nav>
      </aside>
      <main>{children}</main>
    </layout>
  )
}
