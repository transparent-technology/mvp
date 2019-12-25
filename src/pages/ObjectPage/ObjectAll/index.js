import React, { useEffect, useState } from "react"
import styled from "reshadow/macro"

import { method } from "services/api"
import { paper } from "styles"
import { List, Icon } from "components"

export const ObjectAll = ({ history }) => {
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState({})

  useEffect(() => {
    method("HousingStocks").then(res => {
      setState(res)
      setLoading(false)
    })
  }, [])

  return styled(paper)`
    h1 {
      margin-top: 24px;
    }
  `(
    <>
      <h1>Объекты</h1>
      <paper>
        <List
          loading={loading}
          data={state.items}
          renderItem={item => (
            <ObjectListItem
              key={item.id}
              onClick={() => history.push("/objects/" + item.id, item)}
              {...item}
            />
          )}
        />
      </paper>
    </>
  )
}

const ObjectListItem = ({ street, number, city, numberOfTasks, onClick }) =>
  styled`
  li {
    border-bottom: 1px solid #d9d9d9;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    padding: 16px 0;
    cursor: pointer;
    font-size: 12px;
  }

  li:hover h4 {
    color: #189EE9;
  }

  li > * {
    display: flex;
    align-items: inherit;

    &:nth-child(2) {
      justify-self: center;
    }

    &:nth-child(3) {
      justify-self: end;
      & span {
        margin-right: 4px;
        color: rgba(39, 47, 90, 0.45);
      }
    }
  }

  h4 {
    font-weight: 500;
  }

  Icon {
    margin-right: 8px;
  }

`(
    <li data-bordered={true} onClick={onClick}>
      <h4>
        {street}, {number}
      </h4>
      <div>
        <Icon type="map" />
        {city}
      </div>
      {!!numberOfTasks && (
        <div>
          <Icon type="alarm" fill="#ED3B45" />
          <span>Задач:</span>
          {numberOfTasks}
        </div>
      )}
    </li>
  )
