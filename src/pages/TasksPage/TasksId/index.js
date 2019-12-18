import React, { useState, useEffect } from "react"
import styled from "reshadow/macro"

import { method } from "services/api"
import { TasksHeader, Stages, TaskPanel, Comments } from "components"
import { paper, grid } from "styles"

export const TasksId = ({ location, match }) => {
  const [state, setState] = useState({ pushData: null, ...location.state })
  const {
    stages = [],
    currentStage = {},
    pushData,
    userOperatingStatus,
    comments
  } = state
  // console.log("state", state)

  useEffect(() => {
    method.get(`Tasks/${match.params.taskId}`).then(updateState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (pushData) {
      console.log("push")
      method
        .post(`Tasks/${match.params.taskId}/PushStage`, pushData)
        .then(updateState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pushData])

  const updateState = data => {
    setState(state => ({ ...state, ...data }))
  }

  return styled(paper, grid)`
    Comments {
      margin-bottom: 24px;
    }
  `(
    <>
      <div>breadcrumb</div>
      <TasksHeader state={state} />
      <TaskPanel
        currentStage={currentStage}
        push={updateState}
        userStatus={userOperatingStatus}
        loading={!!stages.length}
      />
      <grid>
        <div>
          <Comments
            url={`Tasks/${match.params.taskId}/Comments`}
            data={comments}
            showCreator={userOperatingStatus === "Executor"}
          />
          <paper>info</paper>
        </div>
        <Stages stages={stages} />
      </grid>
    </>
  )
}
