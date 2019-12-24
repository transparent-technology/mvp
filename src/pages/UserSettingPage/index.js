import React, { useEffect, useState } from "react"
import styled from "reshadow/macro"

import { method } from "services/api"
import { paper } from "styles"

const createFieldList = state => [
  { title: "Фамилия и имя сотрудника", value: "firstName" }
]

export const UserSettingPage = () => {
  const [state, setState] = useState(null)
  useEffect(() => {
    method.get("ManagingFirmUsers/current").then(console.log)
  }, [])
  return styled(paper)`
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
        <ul>
          <li>
            <span>ttile</span>
            <span>fieldI</span>
          </li>{" "}
          <li>
            <span>ttile</span>
            <span>fieldI</span>
          </li>{" "}
          <li>
            <span>ttile</span>
            <span>fieldI</span>
          </li>{" "}
          <li>
            <span>ttile</span>
            <span>fieldI</span>
          </li>
        </ul>
      </paper>
    </>
  )
}
