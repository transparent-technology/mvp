import React, { useEffect, useState } from "react"
import styled from "reshadow/macro"

import { method } from "services/api"
import { paper } from "styles"

export const UserSettingPage = () => {
  const [state, setState] = useState(null)
  useEffect(() => {
    method.get("ManagingFirmUsers/current").then(setState)
  }, [])

  return styled(paper)`
    h1 {
      margin-top: 24px;
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      display: grid;
      grid-gap: 32px;
      grid-template-columns: 1fr 1fr 1fr;
    }

    span:first-child {
      display: block;
      font-size: 12px;
      margin-bottom: 8px;
      color: rgba(39, 47, 90, 0.45);
    }

    span:last-child {
      display: flex;
      align-items: center;
      height: 40px;
      border: 1px solid rgba(29, 38, 84, 0.15);
      border-radius: 4px;
      padding-left: 16px;
      font-size: 16px;
    }
  `(
    <>
      <h1>Настройки профиля</h1>
      <paper>
        {state ? (
          <ul>
            <li>
              <span>Фамилия и имя сотрудника</span>
              <span>
                {state.firstName} {state.lastName}
              </span>
            </li>
            <li>
              <span>Должность</span>
              <span>{state.position}</span>
            </li>
            <li>
              <span>Внутренний номер сотрудника</span>
              <span>{state.cellphone}</span>
            </li>
            <li>
              <span>Отдел</span>
              <span>{state.number}</span>
            </li>
            <li>
              <span>Контактный номер</span>
              <span>{state.cellphone}</span>
            </li>
            <li>
              <span>Адрес электронной почты (логин)</span>
              <span>{state.email}</span>
            </li>
          </ul>
        ) : (
          "loading"
        )}
      </paper>
    </>
  )
}
