import React from "react"
import styled, { use } from "reshadow/macro"

import { formatedDate } from "services/date"

export const InfoListItem = ({ address, id, creationTime, onClick }) =>
  styled`
    li {
      border-bottom: 1px solid #d9d9d9;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 12px 0;
    }

    li > span:first-child {
      color: rgba(39, 47, 90, 0.45);
    }

    li[|hover] {
      cursor: pointer;
      &:hover span {
        color: #189EE9;
      }
    }
  `(
    <>
      <li {...use({ hover: true })} onClick={onClick}>
        <span>Адрес</span>
        <span>{address}</span>
      </li>
      <li>
        <span>Номер задачи</span>
        <span>{id}</span>
      </li>
      <li>
        <span>Дата создания задачи</span>
        <span>{formatedDate(creationTime, { time: true })}</span>
      </li>
    </>
  )
