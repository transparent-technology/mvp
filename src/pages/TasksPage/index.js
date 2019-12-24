import React, { createContext } from "react"
import { Route } from "react-router-dom"

import { TasksAll } from "./TasksAll"
import { TasksId } from "./TasksId"

export const TasksContext = createContext()

export const TasksPage = ({ match }) => {
  try {
    return (
      <>
        <Route exact path={match.path} component={TasksAll} />
        <Route path={`${match.path}/:taskId`} component={TasksId} />
      </>
    )
  } catch (error) {
    return "error"
  }
}
