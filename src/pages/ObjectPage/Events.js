import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import styled, { use } from "reshadow/macro"

import { method } from "services/api"
import { formatedDate } from "services/date"
import { paper } from "styles"
import { Icon, List } from "components"
import { getIconProps } from "styles/helper"

const getUlr = (objectId, deviceId) => {
  if (deviceId) return `Tasks?GroupType=NotArchived&Take=3&DeviceId=${deviceId}`
  return `Tasks?GroupType=NotArchived&Take=3&HousingStockId=${objectId}`
}

export const Events = React.memo(() => {
  const { objectId, deviceId } = useParams()
  console.log()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({})
  useEffect(() => {
    const url = getUlr(objectId, deviceId)
    setLoading(true)
    method.get(url).then(res => {
      setState(res)
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId])

  return styled(paper)(
    <paper>
      <h3>События c {!deviceId ? "объектом" : "прибором"} </h3>
      <List
        loading={loading}
        data={state.items}
        renderItem={item => (
          <EvetListItem
            key={item.id}
            showField={!deviceId}
            onClick={() => history.push("/tasks/" + item.id)}
            {...item}
          />
        )}
      />
    </paper>
  )
})

const EvetListItem = ({
  name,
  id,
  device,
  creationTime,
  showField,
  onClick,
  currentStage = {}
}) => {
  return styled`
    li {
      display: grid;
      grid-gap: 4px;
      font-size: 12px;
      padding: 16px 0;
      cursor: pointer;
      border-bottom: 1px solid #d9d9d9;
    }

    li:hover h4 {
      color: #189EE9;
    }

    h4 {
      font-size: 14px;
      font-weight: 500;
    }

    Icon {
      margin-right: 8px;
    }

    row, span {
      display: flex;
      align-items: center;
    }

    span {
      color: rgba(39, 47, 90, 0.45);
    }

    span + span {
      margin-left: 16px;
    }

    span[|ml] {
      margin-left: 4px;
    }
  `(
    <li onClick={onClick}>
      <h4>{name}</h4>
      <row>
        <Icon type="timer" />
        Времени на этап: timer{" "}
        <span {...use({ ml: true })}>
          (до {formatedDate(currentStage.expectedCompletionTime)})
        </span>
      </row>
      <row>
        <span>
          <Icon type="calendar" />
          {formatedDate(creationTime, { time: true })}
        </span>
        <span>
          <Icon type="number" />
          {id}
        </span>
      </row>
      {showField && (
        <row>
          <Icon {...getIconProps(device.resource)} />
          {device.model}
          <span {...use({ ml: true })}>({device.serialNumber})</span>
        </row>
      )}
    </li>
  )
}
