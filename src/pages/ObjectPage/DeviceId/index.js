import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled, { use } from "reshadow/macro"

import { method } from "services/api"
import { paper, tabs, grid } from "styles"
import { Events } from "../Events"

export const DeviceId = ({ match, location }) => {
  const { hash } = location
  const {
    params: { objectId, deviceId }
  } = match
  const [state, setState] = useState({})
  const { device, pipes, devices = [] } = state

  useEffect(() => {
    method
      .get(`HousingStocks/${objectId}/Devices/${deviceId}/${hash.slice(1)}`)
      .then(setState)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash])

  return styled(
    paper,
    tabs,
    grid
  )(
    <>
      <div>breadcrumbs</div>
      <h1>title</h1>
      <grid>
        <paper>
          <tabs>
            <Link to={{ hash: "" }} {...use({ pressed: hash === "" })}>
              Общие данные
            </Link>
            <Link
              to={{ hash: "CommunicationPipes" }}
              {...use({ pressed: hash === "#CommunicationPipes" })}
            >
              Узел коммуникации
            </Link>
            <Link
              to={{ hash: "Related" }}
              {...use({ pressed: hash === "#Related" })}
            >
              Подключенные приборы
            </Link>
          </tabs>
          <ul>
            {hash === "" && "info"}
            {hash === "#CommunicationPipes" && "pipe"}
            {hash === "#Related" && devices.map(item => <li>`</li>)}
          </ul>
        </paper>
        <Events />
      </grid>
    </>
  )
}
