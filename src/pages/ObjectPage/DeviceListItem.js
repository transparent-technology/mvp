import React from "react"
import styled from "reshadow/macro"

import { Icon } from "components"
import { getIconProps } from "styles/helper"
import { formatedDate } from "services/date"

export const DeviceListItem = ({
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
