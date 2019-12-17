import React, { useEffect, useState } from "react"
import styled from "reshadow/macro"
import { Select as AntSelect } from "antd"

import { method } from "services/api"
const { Option: AntOption } = AntSelect

export const useSelect = ({
  name = "",
  url,
  size = "large",
  taskCount = false,
  ...props
} = {}) => {
  const [options, setOptions] = useState(null)

  useEffect(() => {
    method.get(url).then(data => setOptions(data.items))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const select = styled`
    AntSelect {
      width: 100%;
    }

    wrap > span {
      color: rgba(39, 47, 90, 0.45);
      margin-left: 8px;
    }
  `(
    <label>
      <span>{name}</span>
      <AntSelect size={size} {...props}>
        {options &&
          options.map(option => (
            <AntOption key={option.id}>
              <wrap as="span">
                {option.name}
                {taskCount && (
                  <span>(Задач в работе {option.executingTaskCount})</span>
                )}
              </wrap>
            </AntOption>
          ))}
      </AntSelect>
    </label>
  )
  return { select }
}
