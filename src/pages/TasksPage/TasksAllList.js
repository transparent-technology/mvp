import React from "react"
import styled, { use, css } from "reshadow/macro"
import { useHistory } from "react-router-dom"

import { Icon, Device, Timeline } from "components"

export const TasksAllList = ({ items = [] }) => {
  const { push, location } = useHistory()
  if (!items.length) return "empty"
  console.log("items", items)
  return (
    <ul>
      {items.map(item => (
        <TasksAllListItem
          key={item.id}
          onClick={() => push(`/tasks/${item.id}`, item)}
          hash={location.hash}
          {...item}
        />
      ))}
    </ul>
  )
}

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
`

const TasksAllListItem = ({
  id,
  name,
  device,
  creationTime,
  expectedCompletionTime,
  closingTime,
  address,
  perpetrator,
  isResponsible,
  currentStage,
  onClick,
  hash
}) => {
  return styled(tasksItemStyle)(
    <listitem as="li" onClick={onClick}>
      {!closingTime ? (
        <Timeline finish={expectedCompletionTime} start={creationTime} />
      ) : (
        <row>
          <rowitem>
            <Icon type="ok" fill="#17B45A" />
            Выполненно за 12д 14ч
          </rowitem>
        </row>
      )}
      <row>
        <h4>{currentStage ? currentStage.name : name}</h4>
        {!closingTime && name}
      </row>
      {!closingTime && (
        <row>
          <rowitem>
            <Icon type="timer" />
            Время на этап: 14д 12ч (до 12.12.19)
          </rowitem>
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
          date
        </rowitem>
      </row>
    </listitem>
  )
}
