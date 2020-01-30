import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"
import styled, { use } from "reshadow/macro"

import { method } from "services/api"
import { paper, tabs } from "styles"
import { Select as AntSelect, Input } from "antd"
import { TasksList } from "./TaskList"

import { Icon } from "components"

const { Option: AntOption } = AntSelect

const sortSelectItems = [
  { value: "minDate", icon: "sort_max", title: "дате создания" },
  { value: "maxDate", icon: "sort_min", title: "дате создания" },
  { value: "minTimeTask", icon: "sort_max", title: "времени на задачу" },
  { value: "maxTimeTask", icon: "sort_min", title: "времени на задачу" },
  { value: "minTimeStage", icon: "sort_max", title: "времени на этап" },
  { value: "maxTimeStage", icon: "sort_min", title: "времени на этап" }
]

export const TasksAll = ({ location, history }) => {
  const [state, setState] = useState({})
  const { executingTasksCount, observingTasksCount, items = [] } = state
  const { hash, pathname } = location

  useEffect(() => {
    if (hash) {
      setState(state => ({ ...state, items: [] }))
      method.get(`Tasks?GroupType=${hash.slice(1)}`).then(res => {
        setState(res)
      })
    }
  }, [hash])

  if (!hash) return <Redirect to={{ pathname, hash: "Executing" }} />
  return styled(paper, tabs)`
    filter {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;

      & > div {
        justify-self: end;
      }
    }

    h1 {
      margin-top: 24px;
    }

    AntSelect {
      width: 200px;
      margin-left: 8px;
    }

    Icon {
      margin-bottom: -4px;
      margin-right: 8px;
    }

    checked_group {
      display: flex;
      justify-self: start;
      & > :first-child {
        margin-right: 24px;
      }
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
              {sortSelectItems.map(({ value, icon, title }) => (
                <AntOption value={value} key={value}>
                  <Icon type={icon} />
                  {title}
                </AntOption>
              ))}
            </AntSelect>
          </div>
        </filter>
        <TasksList data={items} hash={location.hash} />
      </paper>
    </>
  )
}
