import React from "react"
import styled from "reshadow/macro"

import svg from "assets/empty.svg"

export const Empty = ({emptyText}) => {
  return styled`
    empty {
      display: flex;
      align-items: center;
    }

    span {
      margin-left: 24px;
    }
  `(
    <empty>
      <img src={svg} alt="empty" />
      <span>
        {emptyText || 'Данные отсутствуют'}
      </span>
    </empty>
  )
}
