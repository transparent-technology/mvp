import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import styled, { use } from "reshadow/macro"

import { Button as AntButton } from "antd"
import { method } from "services/api"
import { paper, tabs, field } from "styles"
import { Icon, List } from "components"
import { CompanyPageContext } from "./index"

const createUlr = location => {
  const { hash, pathname } = location
  switch (hash) {
    case "#users":
      return pathname + "/user/create"
    default:
      return pathname + "/contractor/create"
  }
}

export const CompanyProfile = ({ location, history }) => {
  const { hash, pathname } = location
  const { state, dispatch } = useContext(CompanyPageContext)
  const { companyInfo, users, contractors, loading } = state

  // console.log(contractors)

  useEffect(() => {
    if (hash === "" && !companyInfo) {
      method.get("ManagingFirms/current").then(companyInfo => {
        dispatch({ type: "GET_STATE", payload: { companyInfo } })
      })
    }

    if (hash === "#users" && !users.length) {
      method.get("ManagingFirmUsers").then(data => {
        const { items: users } = data
        dispatch({ type: "GET_STATE", payload: { users } })
      })
    }

    if (hash === "#contractors" && !contractors.length) {
      method.get("Contractors").then(data => {
        const { items: contractors } = data
        dispatch({ type: "GET_STATE", payload: { contractors } })
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash])

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
        {hash !== "" && (
          <AntButton onClick={() => history.push(createUlr(location))}>
            <Icon type="plus" fill="#189EE9" />
            Добавить {hash === "#users" ? "сотрудника" : "подрядчика"}
          </AntButton>
        )}
        {hash === "" && (
          <grid>
            <label>
              <span>Название компании</span>
              <field>{companyInfo && companyInfo.name}</field>
            </label>
            <label>
              <span>Телефон</span>
              <field>{companyInfo && companyInfo.phoneNumber}</field>
            </label>
            <label>
              <span>Часовой пояс</span>
              <field>UTC+3</field>
            </label>
          </grid>
        )}
        {hash === "#users" && (
          <>
            <List
              loading={loading}
              data={users || []}
              renderItem={user => (
                <UserListItem
                  key={user.id}
                  {...user}
                  onClick={() => history.push(pathname + "/user/" + user.id)}
                />
              )}
            />
          </>
        )}
        {hash === "#contractors" && (
          <>
            <List
              loading={loading}
              data={contractors || []}
              renderItem={contractor => (
                <UserListItem
                  key={contractor.id}
                  onClick={() =>
                    history.push(pathname + "/contractor/" + contractor.id)
                  }
                  {...contractor}
                />
              )}
            />
          </>
        )}
      </paper>
    </>
  )
}

const UserListItem = ({ name, span, onClick }) =>
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
    <li onClick={onClick}>
      <h4>{name}</h4>
      <span>phone</span>
    </li>
  )
