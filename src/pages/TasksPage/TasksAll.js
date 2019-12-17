import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"
import styled, { use } from "reshadow/macro"

import { method } from "services/api"
import { paper, tabs } from "styles"
import { Select as AntSelect, Input } from "antd"
import { TasksAllList } from "./TasksAllList"
import { Icon } from "components"

const { Option: AntOption } = AntSelect

export const TasksAll = ({ location }) => {
  const [state, setState] = useState({})
  const { executingTasksCount, observingTasksCount, items } = state
  const { hash, pathname } = location

  useEffect(() => {
    if (hash) {
      setState(state => ({ ...state, items: [] }))
      method.get(`Tasks?GroupType=${hash.slice(1)}`).then(setState)
    }
  }, [hash])

  if (!hash) return <Redirect to={{ pathname, hash: "Executing" }} />
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

    Icon {
      margin-bottom: -4px;
      margin-right: 8px;
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
            {executingTasksCount
              ? `К исполнению (${executingTasksCount})`
              : "К исполнению"}
          </Link>
          <Link
            to={{ hash: "Observing" }}
            {...use({ pressed: hash === "#Observing" })}
          >
            {observingTasksCount
              ? `Наблюдаемые (${observingTasksCount})`
              : "Наблюдаемые"}
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
              <AntOption value="minDate">
                <Icon type="sort_max" />
                дате создания
              </AntOption>
              <AntOption value="maxDate">
                <Icon type="sort_min" />
                дате создания
              </AntOption>
              <AntOption value="minTimeTask">
                <Icon type="sort_max" />
                времени на задачу
              </AntOption>
              <AntOption value="maxTimeTask">
                <Icon type="sort_min" />
                времени на задачу
              </AntOption>
              <AntOption value="minTimeStage">
                <Icon type="sort_max" />
                времени на этап
              </AntOption>
              <AntOption value="maxTimeStage">
                <Icon type="sort_min" />
                времени на этап
              </AntOption>
            </AntSelect>
          </div>
        </filter>
        <TasksAllList items={items} />
      </paper>
    </>
  )
}
