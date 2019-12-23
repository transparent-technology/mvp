import React from "react"
import styled from "reshadow/macro"

import { Icon } from "components"

const getIcon = resource => {
  switch (resource) {
    case "ColdWaterSupply":
      return {
        type: "resource_water",
        fill: "#79AFFF"
      }
    case "HotWaterSupply":
      return {
        type: "resource_water",
        fill: "#FF8C68"
      }
    case "Heat":
      return {
        type: "resource_heat"
      }
    default:
      return {
        type: "resource_device"
      }
  }
}

export const Device = ({ model, serialNumber, resource }) =>
  styled`
    wrap {
      display: flex;
      align-items: center;
    }
    Icon {
      margin-right: 8px;
    }
    span {
      color: rgba(39, 47, 90, 0.45);
      margin-left: 4px;
    }
  `(
    <wrap>
      <Icon {...getIcon(resource)} />
      {model}
      <span>({serialNumber})</span>
    </wrap>
  )
