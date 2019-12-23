import React from "react"
import styled from "reshadow/macro"

import { Icon } from "components"

export const TextIcon = ({ children, icon = "" }) =>
  styled`
    wrapper {
      display: flex;
      align-items: center;
    }
    
    Icon {
      margin-right: 8px;
    }
  `(
    <wraper>
      <Icon type={icon} />
      {children}
    </wraper>
  )
