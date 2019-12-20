import React, { useEffect, useState } from "react"
import styled, { css } from "reshadow/macro"

import { method } from "services/api"
import { paper } from "styles"
import { Icon } from "components"

const styles = css`
  li {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-items: center;
    padding: 24px 0;
    border-bottom: 1px solid #d9d9d9;
    font-size: 12px;
    cursor: pointer;

    &:hover h4 {
      color: #189ee9;
    }

    & > *:first-child {
      justify-self: start;
    }

    & > *:last-child {
      justify-self: end;
    }
  }

  div {
    display: flex;
    alin-items: center;
  }

  Icon {
    margin-right: 8px;
  }
  span {
    color: rgba(39, 47, 90, 0.45);
    margin-right: 8px;
  }
`

export const ObjectAll = ({ history, match }) => {
  const [state, setState] = useState({ items: [] })

  useEffect(() => {
    method("HousingStocks").then(setState)
  }, [])

  return styled(
    paper,
    styles
  )(
    <>
      <h1>Объекты</h1>
      <paper>
        <ul>
          {state.items.map(item => (
            <li
              key={item.id}
              onClick={() => history.push(match.url + "/" + item.id)}
            >
              <h4>
                {item.street}, {item.number}
              </h4>
              <div>
                <Icon />
                {item.city}
              </div>
              <div>
                {!!item.numberOfTasks && (
                  <>
                    <Icon type="alarm" fill="#ED3B45" />
                    <span>Задач:</span>2{" "}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </paper>
    </>
  )
}
