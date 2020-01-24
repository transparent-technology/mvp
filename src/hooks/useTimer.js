import React from "react"
import styled, { css } from "reshadow/macro"
import { Icon } from "components"

import { formatedDate, transformDate } from "services/date"

export const useTimer = ({ deadline = null, finishTime = null } = {}) => {
  if (!deadline && !finishTime) return <span>загрузка</span>
  if (finishTime) {
    return <span>загрузк...</span>
  } else {
    const diffInTime = new Date(deadline) - Date.now()

    if (diffInTime >> 0 > 0) {
      return <span>ok</span>
    } else {
      return (
        <Timer
          timer={transformDate(diffInTime)}
          text="Времени на этап:"
          icon="timer"
          deadline={formatedDate(deadline)}
          expired
        />
      )
    }
  }
}

const timerStyle = css`
  wrapper {
    display: flex;
    align-items: center;
    font-size: 12px;

    & > Icon {
      margin-right: 8px;
    }
  }

  text {
    margin-right: 4px;
  }
`

const Timer = props => {
  const { timer, text = "", icon = null, expired } = props
  return styled(timerStyle)`
    /* span {
      color: red;
    } */
    finishspan {
      color: rgba(39, 47, 90, 0.45);
      margin-left: 4px;
    }
  `(
    <wrapper>
      {icon && <Icon type={icon} />}
      {text && <text as="span">{text}</text>}
      <span>{expired ? timer : timer}</span>
      <finishspan as="span">(до {props.deadline})</finishspan>
    </wrapper>
  )
}
