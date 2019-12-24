import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled, { use } from "reshadow/macro"

import { method } from "services/api"
import { paper, tabs, grid } from "styles"
import { Icon, List } from "components"
import { Events } from "../Events"
import { getIconProps } from "styles/helper"
import { InfoListItem } from "../InfoListItem"
import { DeviceListItem } from "../DeviceListItem"
import { PipeListItem } from "../PipeListItem"

export const DeviceId = ({ match, location, history }) => {
  const { hash } = location
  const {
    params: { objectId, deviceId }
  } = match
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({})
  const { device = {}, pipes, devices } = state

  useEffect(() => {
    if (
      (!device.id && hash === "") ||
      (!devices && hash === "#Related") ||
      (!pipes && hash === "#CommunicationPipes")
    ) {
      setLoading(true)
      method
        .get(`HousingStocks/${objectId}/Devices/${deviceId}/${hash.slice(1)}`)
        .then(res => {
          setLoading(false)
          setState(state => ({ ...state, ...res }))
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash])

  return styled(paper, tabs, grid)`
    h1 {
      display: flex;
      align-items: center;
    }
    h1 > Icon {
      margin-right: 8px;
    }
  `(
    <>
      <div>breadcrumbs</div>
      {device ? (
        <h1>
          <Icon size={32} {...getIconProps(device.resource)} />
          {device.model} ({device.serialNumber})
        </h1>
      ) : (
        "loading..."
      )}
      <grid>
        <paper>
          <tabs>
            <Link to={{ hash: "" }} {...use({ pressed: hash === "" })}>
              Общие данные
            </Link>
            {device.resource && (
              <Link
                to={{ hash: "CommunicationPipes" }}
                {...use({ pressed: hash === "#CommunicationPipes" })}
              >
                Узел коммуникации
              </Link>
            )}
            <Link
              to={{ hash: "Related" }}
              {...use({ pressed: hash === "#Related" })}
            >
              Подключенные приборы
            </Link>
          </tabs>

          {hash === "" && (
            <List
              loading={loading}
              data={[
                ["Тип прибора", "type", "type"],
                ["Серийный номер", "serialNumber"],
                [
                  "Дата ввода в эксплуатацию",
                  "commercialAccountingDate",
                  "date"
                ],
                ["Дата поверки прибора", "lastCheckingDate", "date"],
                [
                  "Дата следующей поверки прибора",
                  "futureCheckingDate",
                  "date"
                ],
                ["Диаметр", "diameter"]
              ]}
              renderItem={item => (
                <InfoListItem key={item[0]} title={item[0]} value={item[1]} />
              )}
            />
          )}
          {hash === "#CommunicationPipes" && (
            <List
              loading={loading}
              data={pipes}
              renderItem={item => <PipeListItem key={item.id} {...item} />}
            />
          )}
          {hash === "#Related" && (
            <List
              loading={loading}
              data={devices}
              renderItem={item => (
                <DeviceListItem
                  key={item.id}
                  {...item}
                  onClick={() => {
                    setState({})
                    history.push(`/objects/${objectId}/device/${item.id}`)
                  }}
                />
              )}
            />
          )}
        </paper>
        <Events />
      </grid>
    </>
  )
}
