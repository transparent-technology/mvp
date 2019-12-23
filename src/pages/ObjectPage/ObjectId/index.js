import React, { useEffect, useState } from "react"
import styled, { use } from "reshadow/macro"
import { Link } from "react-router-dom"

import { method } from "services/api"
import { tabs, paper, grid, device_item } from "styles"
import { getIconProps } from "styles/helper"
import { Icon, List } from "components"
import { formatedDate } from "services/date"
import { Events } from "../Events"

export const ObjectId = ({ match, location, history }) => {
  const { hash } = location
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({})
  useEffect(() => {
    if (!state.index || !state.devices) {
      setLoading(true)
      method
        .get(`HousingStocks/${match.params.objectId}/${hash.slice(1)}`)
        .then(res => {
          setLoading(false)
          setState(state => ({ ...state, ...res }))
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash])

  // console.log(state)

  return styled(tabs, paper, grid, device_item)`
    Icon {
      margin-right: 8px;
    }
  `(
    <>
      <div>breadcrumb</div>
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
                  onClick={() => console.log(1)}
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

const InfoListItem = ({ title, value }) =>
  styled`
    li {
      border-bottom: 1px solid #d9d9d9;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 12px 0;
    }
  `(
    <li>
      <span>{title}</span>
      <span>{value}</span>
    </li>
  )

const DeviceListItem = ({
  model,
  serialNumber,
  futureCheckingDate,
  resource,
  onClick
}) => {
  const iconProps = getIconProps(resource)
  return styled`
    li {
      border-bottom: 1px solid #d9d9d9;
      padding: 16px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }

    li > div {
      display: inherit;
      align-items: inherit;

      & span {
        margin-left: 4px;
        color: rgba(39, 47, 90, 0.45);
      }

      &:first-child {
        color: #272F5A;
      }

      &:last-child {
        font-size: 12px;
      }
    }

    Icon {
      margin-right: 8px;
    }
  `(
    <li onClick={onClick}>
      <div>
        <Icon {...iconProps} />
        {model}
        <span>({serialNumber})</span>
      </div>
      <div>
        <Icon type="calendar" /> до {formatedDate(futureCheckingDate)}
      </div>
    </li>
  )
}
