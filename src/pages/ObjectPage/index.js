import React from "react"
import { Route } from "react-router-dom"

import { ObjectAll } from "./ObjectAll"

export const ObjectPage = ({ match }) => {
  return (
    <>
      <Route exact path={match.path} component={ObjectAll} />
      <Route path={match.path + "/:id"} render={() => "hello"} />
    </>
  )
}
