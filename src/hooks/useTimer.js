import React from "react"
import styled, { css } from "reshadow/macro"
import { Icon } from "components"

const transformDate = time => {
  const days = Math.abs(time) / 1000 / 60 / 60 / 24
  const hours = (days - (days >> 0)) * 24
  const minutes = (hours - (hours >> 0)) * 60

  if (days >> 0) {
    return `${days >> 0}д ${hours >> 0}ч`
  }
  if (hours >> 0) {
    return `${hours >> 0}ч ${minutes >> 0}м`
  } else {
    return `${minutes >> 0}м`
  }
}

export const useTimer = ({ deadline = null, finishTime = null } = {}) => {
  if (!deadline && !finishTime) {
    return <span>загрузка</span>
  } else if (finishTime) {
    const diffInTime = new Date(deadline) - new Date(finishTime)
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
    span {
      color: red;
    }
  `(
    <wrapper>
      {icon && <Icon type={icon} />}
      {text && <text as="span">{text}</text>}
      <span>{expired ? `просрочено на ${timer}` : timer}</span>
    </wrapper>
  )
}
