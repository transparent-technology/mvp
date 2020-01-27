import React from "react"
import styled, { css } from "reshadow/macro"

import { transformDate } from "services/date"
import { Icon } from "components/Icon"

const styles = css`
  timeline {
    display: flex;
    align-items: center;
    & > *:not(:last-child) {
      margin-right: 8px;
    }
  }

  line {
    flex-grow: 1;
    height: 4px;
    border-radius: 8px;
    background-color: rgba(39, 47, 90, 0.04);
    position: relative;
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      height: 100%;
      background-color: red;
    }
  }

  difftime {
    color: rgba(39, 47, 90, 0.45);
  }
`

const getPercent = (start, end) => {
  const now = Date.now()
  const first = new Date(start)
  const second = new Date(end)

  return ((now - first) / (second - first)) * 100
}

export const useTimeline = ({
  closingTime,
  creationTime,
  expectedCompletionTime
}) => {
  const percent = getPercent(creationTime, expectedCompletionTime)
  const deadline = new Date(expectedCompletionTime).toLocaleDateString("ru")
  const colorLine =
    percent < 50 ? "#17B45A" : percent < 80 ? "#FF8413" : "#FF2F13 "
  const time = new Date(closingTime) - new Date(creationTime)
  const diffTime = new Date(expectedCompletionTime) - new Date(closingTime)

  if (closingTime) {
    return styled(styles)(
      <timeline>
        <Icon type="ok" fill="#17B45A" />
        <span>Выполненно за {transformDate(time)}</span>
        <difftime as="span">(+{transformDate(diffTime)})</difftime>
      </timeline>
    )
  }

  return styled(styles)`
    line::before {
      width: ${percent + "%"};
      background-color: ${colorLine};
    }
  `(
    <timeline>
      <line />
      <span>до {deadline}</span>
    </timeline>
  )
}
