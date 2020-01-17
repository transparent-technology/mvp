import React from "react"
import styled, { css, use } from "reshadow/macro"

const labelStyle = css`
  label {
    width: 100%;
    display: flex;

    & span {
      display: block;
      margin-bottom: 8px;
      font-size: 12px;
      color: rgba(39, 47, 90, 0.45);
    }
  }
`

const inputStyle = css`
  input {
    color: red;
    padding: 0 16px;
    outline: none;
  }

  input[|size] {
    &="s" {
      border: 1px solid red;
    }
  }
`

export const Input = ({ label = "", size = "normal", ...props }) => {
  if (label)
    return styled(
      labelStyle,
      inputStyle
    )(
      <wrapper as="label">
        <span>{label}</span>
        <input {...use({ size })} {...props} />
      </wrapper>
    )
  return styled(inputStyle)(<input {...use({ size })} {...props} />)
}
