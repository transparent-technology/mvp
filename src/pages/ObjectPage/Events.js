import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import { method } from "services/api"
import { formatedDate } from "services/date"
import { paper } from "styles"
import { Icon, Device } from "components"

const events = css`
  event_item {
    display: grid;
    font-size: 12px;
    padding: 16px 0;
    grid-gap: 4px;
    cursor: pointer;
    border-bottom: 1px solid #d9d9d9;

    &:hover h5 {
      color: #189ee9;
    }
  }

  h5 {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
  }

  row,
  rowbottom {
    display: flex;
    align-items: center;
  }

  rowbottom {
    color: rgba(39, 47, 90, 0.45);
  }

  Icon {
    margin-right: 8px;
  }
  time {
    margin-right: 16px;
  }
`

export const Events = ({ object = true }) => {
  const { objectId } = useParams()
  const { push } = useHistory()
  const [state, setState] = useState({})
  useEffect(() => {
    method
      .get(`Tasks?GroupType=NotArchived&Take=3&HousingStockId=${objectId}`)
      .then(setState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return styled(
    paper,
    events
  )(
    <paper>
      <h3>События c {object ? "объектом" : "прибором"} </h3>
      {state.items ? (
        <ul>
          {state.items.map(item => (
            <event_item
              as="li"
              key={item.id}
              onClick={() => push(`/tasks/${item.id}`, item)}
            >
              <h5>{item.name}</h5>
              <row>
                <Icon type="timer" /> Времени на этап: 12д 12ч (до 21.10.19)
              </row>
              <rowbottom>
                <Icon type="calendar" />
                <time>{formatedDate(item.creationTime, { time: true })}</time>
                <Icon type="number" />
                {item.id}
              </rowbottom>
              <Device {...item.device} />
            </event_item>
          ))}
        </ul>
      ) : (
        "loading..."
      )}
    </paper>
  )
}
