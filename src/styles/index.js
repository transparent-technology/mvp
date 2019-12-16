import { css } from "reshadow/macro"

export const paper = css`
  paper {
    padding: 16px 24px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    display: grid;
    grid-gap: 24px;
    color: rgba(39, 47, 90, 0.65);
  }
`
export const tabs = css`
  tabs {
    display: flex;
    border-bottom: 1px solid #d9d9d9;
  }

  tabs > * {
    padding: 0 16px 10px;
    position: relative;

    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    &[|pressed] {
      color: #189ee9;
      &::before {
        background: #189ee9;
      }
    }
  }
`

