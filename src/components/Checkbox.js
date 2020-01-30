import React from "react"
import styled, { css } from "reshadow/macro"

const svgDone = (
  <svg
    width="8"
    height="7"
    viewBox="0 0 8 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0.5 3.5L3 5.5L7 1" stroke="white" strokeWidth="1.5" />
  </svg>
)

const svgLine = (
  <svg
    width="10"
    height="2"
    viewBox="0 0 10 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      as="path"
      d="M1.5 1H8.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Checkbox = ({
  styles,
  text,
  allDone,
  onChange,
  stopPropagation
}) => {
  return styled(styles)`
    input:checked + div {
      background-color: #189ee9;
      border-color: #189ee9;
    }
  `(
    <checkbox as="label" onClick={e => stopPropagation && e.stopPropagation()}>
      <input type="checkbox" onChange={onChange} />
      <div>{allDone ? svgDone : svgLine}</div>
      {text && <span>{text}</span>}
    </checkbox>
  )
}

Checkbox.defaultProps = {
  stopPropagation: false,
  allDone: true,
  onChange: e => console.log(e),
  styles: css`
    checkbox {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 2px;
    }

    input {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      border: 0;
      padding: 0;
      clip: rect(0 0 0 0);
      overflow: hidden;
    }

    div {
      border: 1px solid rgba(39, 47, 90, 0.65);
      width: 12px;
      height: 12px;
      border-radius: 2px;
      transition: background 0.3s;
      position: relative;
      & > * {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    span {
      margin: 0;
      margin-left: 8px;
      font-size: 14px;
      font-weight: 600;
      color: rgba(39, 47, 90, 0.65);
    }
  `
}
