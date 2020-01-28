/* eslint-disable no-unused-vars */
import React from "react"
import styled, { css } from "reshadow/macro"
import { Icon } from "components"

import { formatedDate, transformDate } from "services/date"

export const useTimer = ({ currentStage }) => {
  if (!currentStage) return null
  const { closingTime, startingTime, expectedCompletionTime } = currentStage
  const timeLimit = new Date(expectedCompletionTime) - Date.now()

  return styled`
    timer {
      display: flex;
      align-items: center;
    }

    Icon {
      margin-right: 8px;
    }

    span {
      margin-left: 8px;
      color: ${timeLimit < 0 ? "#ED3B45" : "inherit"};
    }

    deadline {
      margin-left: 4px;
      color: rgba(39, 47, 90, 0.45);
    }
  `(
    <timer>
      <Icon type="timer" />
      Время на этап:
      <span>
        {timeLimit < 0 && "-"}
        {transformDate(timeLimit)}
      </span>
      <deadline as="span">(до {formatedDate(expectedCompletionTime)})</deadline>
    </timer>
  )
}
