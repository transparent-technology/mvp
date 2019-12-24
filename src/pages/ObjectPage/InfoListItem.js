import React from "react"
import styled from "reshadow/macro"

export const InfoListItem = ({ title, value }) => {
  return styled`
  li {
    border-bottom: 1px solid #d9d9d9;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 12px 0;
  }
  
  li > span:first-child {
    color: rgba(39, 47, 90, 0.45);
  }
  `(
    <li>
      <span>{title}</span>
      <span>{value}</span>
    </li>
  )
}
