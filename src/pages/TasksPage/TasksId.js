import React, { useState, useEffect } from "react"
import styled from "reshadow/macro"

import { method } from "services/api"
import { TasksHeader, Stages } from "components"
import { paper, grid } from "styles"

export const TasksId = ({ location, match }) => {
  const [state, setState] = useState({ ...location.state })
  const { stages } = state
  useEffect(() => {
    method.get(`Tasks/${match.params.id}`).then(setState)
  }, [])
  return styled(
    paper,
    grid
  )(
    <>
      <div>breadcrumb</div>
      <TasksHeader state={state} />
      <div>panel</div>
      <grid>
        <div>
          <paper>
            <h3>Комментарии</h3>
          </paper>
          <paper>info</paper>
        </div>
        <Stages stages={stages} />
      </grid>
    </>
  )
}
