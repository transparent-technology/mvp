import React, { useEffect, useState } from "react"
import styled, { use } from "reshadow/macro"
import { Link } from "react-router-dom"

import { method } from "services/api"
import { tabs, paper, grid, breadcrumbs } from "styles"
import { List } from "components"
import { Events } from "../Events"
import { InfoListItem } from "../InfoListItem"
import { DeviceListItem } from "../DeviceListItem"

export const ObjectId = ({ match, location, history }) => {
  const { hash } = location
  const { params } = match
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({})
  useEffect(() => {
    if (!state.index || !state.devices) {
      setLoading(true)
      method
        .get(`HousingStocks/${params.objectId}/${hash.slice(1)}`)
        .then(res => {
          setLoading(false)
          setState(state => ({ ...state, ...res }))
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash])

  return styled(tabs, paper, grid, breadcrumbs)`
    Icon {
      margin-right: 8px;
    }
  `(
    <>
      <breadcrumbs>
        <Link to="/objects">Объекты /</Link>
        {state.street && (
          <span>
            {state.street}, {state.number}
          </span>
        )}
      </breadcrumbs>
      {state.street ? (
        <h1>
          {state.street}, {state.number}
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
            <Link
              to={{ hash: "Devices" }}
              {...use({ pressed: hash === "#Devices" })}
            >
              Приборы
            </Link>
          </tabs>
          {hash === "" && (
            <List
              loading={loading}
              data={[
                ["Город", "city"],
                ["Район", "district"],
                ["Индекс", "index"],
                ["Количество подъездов", "numberOfEntrances"],
                ["Количество этажей", "numberOfFloors"],
                ["Наличие лифта", "isThereElevator"],
                ["Количество квартир", "numberOfApartments"],
                ["Общая площадь жилых помещений", "totalLivingArea"],
                ["Площадь нежилых помещений", "areaOfNonResidential"],
                ["Придомовая площадь", "houseArea"],
                ["Общая площадь", "totalArea"],
                ["Год постройки", "constructionDate"]
              ]}
              renderItem={item => (
                <InfoListItem
                  key={item[0]}
                  title={item[0]}
                  value={state[item[1]]}
                />
              )}
            />
          )}
          {hash === "#Devices" && (
            <List
              loading={loading}
              data={state.devices}
              renderItem={item => (
                <DeviceListItem
                  key={item.id}
                  onClick={() =>
                    history.push(
                      `/objects/${params.objectId}/device/${item.id}`,
                      { device: item }
                    )
                  }
                  {...item}
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
