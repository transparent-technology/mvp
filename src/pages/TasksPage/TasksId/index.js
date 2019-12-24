import React, { useState, useEffect } from "react"
import styled from "reshadow/macro"

import { method } from "services/api"
import {
  TasksHeader,
  Stages,
  TaskPanel,
  Comments,
  List,
  Icon
} from "components"
import { paper, grid } from "styles"
import { InfoListItem } from "./InfoListItem"
import { DeviceListItem } from "./DeviceListItem"
import { getIconProps } from "styles/helper"

export const TasksId = ({ location, match, history }) => {
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState({ pushData: null, ...location.state })
  const {
    stages = [],
    currentStage = {},
    pushData,
    userOperatingStatus,
    comments,
    device = {}
  } = state
  console.log("state", state)

  useEffect(() => {
    method.get(`Tasks/${match.params.taskId}`).then(res => {
      updateState(res)
      setLoading(false)
    })
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

    title_device {
      display: flex;
      align-items: center;
      justify-self: start;
      cursor: pointer;

      &:hover {
        color: #189ee9;
      }
    }

    Icon {
      margin-right: 8px;
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
          <paper>
            <h3>Информация о задаче</h3>
            <List
              loading={loading}
              data={[state]}
              renderItem={item => (
                <InfoListItem
                  key={item.id}
                  onClick={() =>
                    history.push("/objects/" + item.housingStockId)
                  }
                  {...item}
                />
              )}
            />
            {device.model ? (
              <title_device
                as="h3"
                onClick={() =>
                  history.push(
                    `/objects/${state.housingStockId}/device/${device.id}`
                  )
                }
              >
                <Icon size={24} {...getIconProps(device.resource)} />
                {device.model} ({device.serialNumber})
              </title_device>
            ) : null}

            <List
              loading={loading}
              data={[device]}
              renderItem={(item, i) => <DeviceListItem key={i} {...item} />}
            />
          </paper>
        </div>
        <Stages
          stages={stages}
          isExecutor={userOperatingStatus === "Executor"}
        />
      </grid>
    </>
  )
}
