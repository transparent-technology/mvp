import React from "react"

import icons from "./icons.json"

export const Icon = ({
  type = "map",
  size = 16,
  fill = "currentColor",
  ...props
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={fill} {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d={icons[type]} />
    </svg>
  )
}
