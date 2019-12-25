import React from "react"
import styled from "reshadow/macro"

import { formatedDate } from "services/date"
// import { useTimer } from "hooks"

export const Timeline = ({ start, finish }) => {
  const startDate = new Date(start).getTime()
  const finishDate = new Date(finish).getTime()
  let percent = ((Date.now() - startDate) / (finishDate - startDate)) * 100
  if (percent >= 100) percent = 100

  return styled`
    timeline {
      display: flex;
      align-items: center;
    }

    line {
      flex-grow: 1;
      height: 4px;
      border-radius: 8px;
      background: rgba(39, 47, 90, 0.04);
      margin-right: 8px;
      overflow: hidden;
      position: relative;

      &::before {
        content: '';
        display: block;
        background: #ED3B45;
        width: ${percent + "%"};
        border-radius: inherit;
        height: 100%;
        left: 0;
        top: 0;
        
      }
    }
  `(
    <timeline>
      <line />
      до {formatedDate(finish)}
    </timeline>
  )
}
