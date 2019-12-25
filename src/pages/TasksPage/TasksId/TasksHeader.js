import React from "react"
import styled from "reshadow/macro"

import { Timeline, Icon } from "components"

export const TasksHeader = ({ state }) => {
  const {
    name,
    closingTime,
    creationTime,
    expectedCompletionTime,
    currentStage = {}
  } = state


  return styled`
    taskheader {
      color: rgba(39, 47, 90, 0.65);
    }

    row {
      display: flex;
      align-items: center;
      font-size: 12px;
    }

    Icon {
      margin-right: 8px;
    }
  `(
    <taskheader>
      <h1>{closingTime ? name : currentStage.name}</h1>
      {!closingTime && name}
      <Timeline start={creationTime} finish={expectedCompletionTime} />
      <row>
        <Icon type="timer" />
        Времени на этап: 14д 12ч (до{" "}
        {new Date(expectedCompletionTime).toLocaleDateString()})
      </row>
    </taskheader>
  )
}
