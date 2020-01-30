import React from "react"
import styled, { css } from "reshadow/macro"

export const Radiobtn = ({ styles }) => {
  return styled(styles)(
    <radiobtn as="label">
      <input type="radio" />
      <div />
    </radiobtn>
  )
}

Radiobtn.defaultProps = {
  styles: css``
}
