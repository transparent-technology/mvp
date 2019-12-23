import React from "react"
import styled from "reshadow/macro"

export const InfoListItem = ({ title, value }) =>
  styled`
    li {
      border-bottom: 1px solid #d9d9d9;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 12px 0;
    }
  `(
    <li>
      <span>{title}</span>
      <span>{value}</span>
    </li>
  )
