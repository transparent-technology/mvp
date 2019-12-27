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

export const grid = css`
  grid {
    display: grid;
    grid-template-columns: 8fr 4fr;
    grid-column-gap: 24px;
    align-items: start;
  }
`

export const avatar = css`
  avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #f3f5f6;
    color: rgba(39, 47, 90, 0.45);
  }
`
export const comment = css`
  comment_wrap {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 8px;
  }
  comment_header {
    font-size: 12px;
    color: rgba(39, 47, 90, 0.45);
    & > time {
      color: rgba(39, 47, 90, 0.25);
    }
  }
`
export const breadcrumbs = css`
  breadcrumbs {
    margin-top: 16px;
    color: rgba(39, 47, 90, 0.45);
  }

  breadcrumbs > * {
    margin-right: 4px;
  }

  breadcrumbs > span {
    color: rgba(39, 47, 90, 0.65);
  }
`

export const field = css`
  field {
    display: flex;
    align-items: center;
    height: 40px;
    border: 1px solid rgba(29, 38, 84, 0.15);
    border-radius: 4px;
    padding-left: 16px;
    font-size: 16px;
  }
`
