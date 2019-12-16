import React, { createContext } from "react"
import { Route } from "react-router-dom"

import { TasksAll } from "./TasksAll"

export const TasksContext = createContext()

export const TasksPage = ({ match }) => (
  <TasksContext.Provider value={{}}>
    <Route exact path={match.path} component={TasksAll} />
    <Route path={`${match.path}/:id`} render={() => "tasks id"} />
  </TasksContext.Provider>
)
