import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled, { use } from "reshadow/macro"

import { Button as AntButton } from "antd"
import { method } from "services/api"
import { paper, tabs, field } from "styles"
import { Icon, List } from "components"

export const CompanyProfile = ({ location, history }) => {
  const [{ loading, users, name, phoneNumber }, setState] = useState({
    loading: false
  })
  const { hash, pathname } = location

  useEffect(() => {
    if (hash === "#users" && !users) {
      setState(state => ({ ...state, loading: true }))
      method.get(`ManagingFirmUsers`).then(res => {
        setState(state => ({ ...state, users: res.items, loading: false }))
      })
    }

    if (hash === "" && !name) {
      setState(state => ({ ...state, loading: true }))
      method.get("ManagingFirms/current").then(res => {
        setState(state => ({ ...state, ...res, loading: false }))
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash])
  console.log(users)

  return styled(paper, tabs, field)`
    h1 {
      margin-top: 24px;
    }

    AntSelect {
      width: 200px;
      margin-left: 8px;
    }

    Icon {
      margin-bottom: -4px;
      margin-right: 8px;
    }
    grid {
      display: grid;
      grid-template-columns: 3fr 9fr;
      grid-gap: 32px;

      & > *:first-child {
        grid-column: 1 / -1;
      }
    }

    AntButton {
      justify-self: start;
    }
  `(
    <>
      <h1>Профиль компании</h1>
      <paper>
        <tabs>
          <Link to={{ hash: "" }} {...use({ pressed: hash === "" })}>
            Общие данные
          </Link>
          <Link to={{ hash: "users" }} {...use({ pressed: hash === "#users" })}>
            Сотрудники
          </Link>
          <Link
            to={{ hash: "contractors" }}
            {...use({ pressed: hash === "#contractors" })}
          >
            Подрядчики
          </Link>
        </tabs>
        {hash === "" && (
          <grid>
            <label>
              <span>Название компании</span>
              <field>{name ? name : "loading..."}</field>
            </label>
            <label>
              <span>Телефон</span>
              <field>{phoneNumber}</field>
            </label>
            <label>
              <span>Часовой пояс</span>
              <field>UTC+3</field>
            </label>
          </grid>
        )}
        {hash === "#users" && (
          <>
            <AntButton>
              <Icon type="plus" fill="#189EE9" />
              Добавить сотрудника
            </AntButton>
            <List
              loading={loading}
              data={users}
              renderItem={user => <UserListItem key={user.id} {...user} />}
            />
          </>
        )}
        {hash === "#contractors" && (
          <>
            <AntButton>
              <Icon type="plus" fill="#189EE9" />
              Добавить подрядчика
            </AntButton>
            <List
              data={[1, 3, 4]}
              renderItem={user => <UserListItem key={user} />}
            />
          </>
        )}
      </paper>
    </>
  )
}

const UserListItem = ({ name, cellphone }) =>
  styled`
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: 1px solid #d9d9d9;
      cursor: pointer;
      &:hover > h4 {
        color: #189EE9;
      }
    }

    h4 {
      font-weight: 600;
    }
  `(
    <li>
      <h4>{name}</h4>
      <span>phone</span>
    </li>
  )
