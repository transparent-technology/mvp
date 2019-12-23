import React from "react"
import { Route, Switch } from "react-router-dom"

import { ObjectAll } from "./ObjectAll"
import { ObjectId } from "./ObjectId"
import { DeviceId } from "./DeviceId"

export const ObjectPage = ({ match }) => {
  return (
    <Switch>
      <Route
        path={match.path + "/:objectId/device/:deviceId"}
        component={DeviceId}
      />
      <Route path={match.path + "/:objectId"} component={ObjectId} />
      <Route path={match.path} component={ObjectAll} />
    </Switch>
  )
}
