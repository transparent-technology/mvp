import React from "react"
import styled, { use, css } from "reshadow/macro"
import { useHistory } from "react-router-dom"

import { useTimeline, useTimer } from "hooks"
import { formatedDate } from "services/date"
import { Icon, Device, Checkbox } from "components"

const tasksItemStyle = css`
  listitem {
    padding: 24px 0;
    border-bottom: 1px solid #d9d9d9;
    cursor: pointer;
    font-size: 12px;
    display: grid;
    grid-row-gap: 8px;

    &:hover h4 {
      color: #189ee9;
    }
  }

  row {
    display: flex;
    align-items: center;
    & > *:not(:last-child) {
      margin-right: 16px;
    }

    & h4 {
      margin-right: auto;
    }
  }

  rowitem {
    display: inherit;
    align-items: inherit;

    &[|push] {
      margin-right: auto;
    }
  }

  rowitem[|caption] {
    color: rgba(39, 47, 90, 0.45);
  }

  Icon {
    margin-right: 8px;
  }

  h4 {
    font-weight: 500;
  }

  rowtop {
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    align-items: center;
    grid-gap: 16px;
    & *:nth-child(3) {
      text-align: right;
    }
  }
`

export const TasksAllListItem = ({
  id,
  name,
  device,
  creationTime,
  expectedCompletionTime,
  closingTime,
  address,
  perpetrator,
  currentStage = {},
  checked,
  toggleCheck,
  hash
}) => {
  const { push } = useHistory()
  const timeline = useTimeline({
    expectedCompletionTime,
    creationTime,
    closingTime
  })

  const timer = useTimer({ currentStage })

  return styled(tasksItemStyle)(
    <listitem as="li" onClick={() => push("/tasks/" + id)}>
      {timeline}
      <rowtop>
        {!closingTime && (
          <Checkbox onChange={toggleCheck} checked={checked} stopPropagation />
        )}
        <h4>{currentStage ? currentStage.name : name}</h4>
        <span>{!closingTime && name}</span>
      </rowtop>
      {!closingTime && (
        <row>
          <rowitem>{timer}</rowitem>
          {hash === "#Observing" && (
            <rowitem>
              <Icon type="username" />
              {perpetrator.name}
            </rowitem>
          )}
        </row>
      )}
      <row>
        <Device {...device} />
        <rowitem {...use({ push: true })}>
          <Icon type="map" />
          {address}
        </rowitem>
        <rowitem {...use({ caption: true })}>
          <Icon type="number" />
          {id}
        </rowitem>
        <rowitem {...use({ caption: true })}>
          <Icon type="calendar" />
          {formatedDate(creationTime, { time: true })}
        </rowitem>
      </row>
    </listitem>
  )
}
