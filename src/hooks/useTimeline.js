import React from "react"
import styled, { css } from "reshadow/macro"

const timelineStyle = css`
  line {

  }
`

export const useTimeline = () => {
  return styled(timelineStyle)(
    <div>
      <line /> до
    </div>
  )
}
