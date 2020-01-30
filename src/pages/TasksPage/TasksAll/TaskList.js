import React, { useState, useEffect } from "react"
import styled, { css } from "reshadow/macro"

import { TasksAllListItem } from "./TasksAllListItem"

export const TasksList = ({ styles, data = [] }) => {
  const [tasks, setTasks] = useState(data)
  const [checkedTaskIds, setCheckedTaskIds] = useState([])

  useEffect(() => {
    setTasks(data)
  }, [data])

  console.log(checkedTaskIds)

  const toggleCheck = (e, id) => {
    if (e.target.checked) {
      setCheckedTaskIds([...checkedTaskIds, id])
    } else {
      setCheckedTaskIds(checkedTaskIds.filter(item => item.id !== id))
    }
  }

  return styled(styles)(
    <ul>
      {tasks.map(item => (
        <TasksAllListItem
          key={item.id}
          toggleCheck={e => toggleCheck(e, item.id)}
          {...item}
        />
      ))}
    </ul>
  )
}

TasksList.defaultProps = {
  styles: css`
    ul {
      margin: 0;
      padding: 0;
    }
  `
}
