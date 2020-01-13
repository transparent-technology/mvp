import React from "react"
import styled, { css } from "reshadow/macro"

const loader = css`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  loader {
    justify-self: start;
    display: grid;
    grid-template-columns: auto auto;
    animation: spin 2s infinite linear;
  }

  span {
    display: block;
    width: 5px;
    height: 5px;
    margin: 5px;
    border-radius: 50%;
    background-color: #189ee9;
  }

  span:nth-child(2) {
    opacity: 0.6;
  }
  span:nth-child(3) {
    opacity: 0.4;
  }
  span:nth-child(4) {
    opacity: 0.2;
  }

  container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const Loader = () => {
  return styled(loader)(
    <container>
      <loader>
        <span />
        <span />
        <span />
        <span />
      </loader>
      полученние данных с сервера ...
    </container>
  )
}
