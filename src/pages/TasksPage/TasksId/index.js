/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import { formatedDate } from "services/date"
import { method } from "services/api"
import { List, Icon } from "components"
import { paper, grid, breadcrumbs } from "styles"
import { getIconProps } from "styles/helper"
import { useTimer, useTimeline } from "hooks"
import { InfoListItem } from "./InfoListItem"
import { DeviceListItem } from "./DeviceListItem"
import { CommentListItem } from "./CommentListItem"
import { CommentCreator } from "./CommentCreator"
import { Panel } from "./Panel"
import { Stages } from "./Stages"
import { Documents } from "./Documents"
import { Owner } from "./Owner"

const getCurrentPage = (props = {}) => {
  if (props.closingTime) return "Архив"
  if (props.userOperatingStatus === "Executor") return "К исполнению"
  if (props.userOperatingStatus === "Observer") return "Наблюдаемые"
  return ""
}

const taskIdStyles = css`
  Comments {
    margin-bottom: 24px;
  }

  grid > div {
    display: inherit;
    grid-gap: 24px;
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

  taskheader {
    color: rgba(39, 47, 90, 0.65);
  }

  row {
    display: flex;
    align-items: center;
    font-size: 12px;
  }

  Icon {
    margin-right: 8px;
  }
  spantime {
    margin-left: 8px;
  }
`

export const TasksId = ({ match, history }) => {
  const [loading, setLoading] = useState(true)

  const [state, setState] = useState({
    pageUrl: `Tasks/${match.params.taskId}`
  })

  console.log(state)
  const {
    creationTime,
    expectedCompletionTime,
    name,
    pageUrl,
    stages = [],
    closingTime,
    currentStage = {},
    pushData,
    userOperatingStatus,
    comments = [],
    documents = [],
    device = {},
    type
  } = state

  const timeline = useTimeline({
    expectedCompletionTime,
    closingTime,
    creationTime
  })

  const timer = useTimer({ currentStage })

  useEffect(() => {
    method.get(pageUrl).then(res => {
      updateState(res)
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (pushData) {
      console.log("push")
      method.post(pageUrl + "/PushStage", pushData).then(updateState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pushData])

  const updateState = data => {
    setState(state => ({ ...state, ...data }))
  }

  const deleteDocument = docId => {
    const deletedList = documents.filter(item => item.id !== docId)
    setState(state => ({ ...state, documents: deletedList }))
  }

  return styled(
    paper,
    grid,
    breadcrumbs,
    taskIdStyles
  )(
    <>
      {/* breadcrumbs */}
      <breadcrumbs>
        <Link to="/tasks">Задачи /</Link>
        <span>{getCurrentPage({ userOperatingStatus, closingTime })}</span>
      </breadcrumbs>

      {/* header */}
      <taskheader>
        <h1>{closingTime ? name : currentStage.name} </h1>
        {!closingTime && name}
        {timeline}
        {timer}
      </taskheader>

      <Panel
        currentStage={currentStage}
        update={updateState}
        userStatus={userOperatingStatus}
        loadingPage={loading}
        url={pageUrl}
      />
      <Documents
        data={documents}
        url={`/Tasks/${match.params.taskId}/Documents/`}
        remoteDocument={deleteDocument}
      />
      <grid>
        <div>
          {/* comments */}
          {closingTime && !comments.length ? null : (
            <paper>
              <h3>Комментарии {!!comments.length && `(${comments.length})`}</h3>
              <List
                loading={loading}
                data={comments}
                emptyText="Комментарий еще не добавлен"
                renderItem={comment => (
                  <CommentListItem
                    key={comment.id}
                    update={updateState}
                    url={pageUrl + "/Comments"}
                    list={comments}
                    {...comment}
                  />
                )}
              />
              {userOperatingStatus === "Executor" && (
                <CommentCreator
                  url={pageUrl + "/Comments"}
                  list={comments}
                  update={updateState}
                />
              )}
            </paper>
          )}

          {type === " IndividualDeviceCheck" && <Owner />}
          {/* info block */}
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
          update={updateState}
          url={pageUrl}
        />
      </grid>
    </>
  )
}
