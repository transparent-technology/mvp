import React from "react"
import { Link } from "react-router-dom"
import styled, { use } from "reshadow/macro"

import { paper, tabs } from "styles"
import { Select as AntSelect, Input } from "antd"
import { TasksAllList } from "./TasksAllList"

const { Option } = AntSelect

export const TasksAll = ({ location }) => {
  const { hash } = location
  return styled(paper, tabs)`
    filter {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    div {
      justify-self: end;
    }
    AntSelect {
      width: 200px;
      margin-left: 8px;
    }
  `(
    <>
      <h1>Задачи</h1>
      <paper>
        <tabs>
          <Link
            to={{ hash: "Executing" }}
            {...use({ pressed: hash === "#Executing" })}
          >
            К исполнению
          </Link>
          <Link
            to={{ hash: "Observing" }}
            {...use({ pressed: hash === "#Observing" })}
          >
            Наблюдаемые
          </Link>
          <Link
            to={{ hash: "Archived" }}
            {...use({ pressed: hash === "#Archived" })}
          >
            Архив
          </Link>
        </tabs>
        <filter>
          <Input.Search />
          <div>
            Сортировать по:
            <AntSelect defaultValue="minDate">
              <Option value="minDate">дате создания</Option>
              <Option value="maxDate">дате создания</Option>
              <Option value="minTimeTask">времени на задачу</Option>
              <Option value="maxTimeTask">времени на задачу</Option>
              <Option value="minTimeStage">времени на этап</Option>
              <Option value="maxTimeStage">времени на этап</Option>
            </AntSelect>
          </div>
        </filter>
        <TasksAllList />
      </paper>
    </>
  )
}
