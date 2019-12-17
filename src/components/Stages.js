import React from "react"
import styled, { css, use } from "reshadow/macro"

import { Icon } from "components"
import { paper } from "styles"

export const Stages = ({ stages = [] }) => {
  if (!stages.length) return "загрузка..."
  return styled(paper)(
    <paper>
      <h3>Этапы выполнения</h3>
      <ul>
        {stages.map(stage => (
          <StageItem key={stage.id} {...stage} />
        ))}
      </ul>
    </paper>
  )
}

const stage = css`
  stage {
    display: grid;
    grid-template-columns: auto 1fr;
    min-height: 48px;
    position: relative;
    &:not(:last-child)::before {
      content: "";
      display: block;
      height: calc(100% - 28px);
      width: 2px;
      background: rgba(39, 47, 90, 0.25);
      position: absolute;
      left: 11px;
      bottom: 2px;
    }
  }

  stage[|status="InProgress"] {
    color: #272f5a;

    &::before {
      background: #189ee9;
    }

    & content {
      font-weight: 600;
    }

    & shape {
      background: #189ee9;
      color: #fff;
      border-color: #189ee9;
    }
  }

  stage[|status="Done"] {
    font-weight: 400;
    color: #272f5a;
    & shape {
      color: #189ee9;
    }

    &::before {
      background: #189ee9;
    }
  }

  shape {
    width: 24px;
    height: 24px;
    border: 1px solid;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    color: rgba(39, 47, 90, 0.25);
  }

  content {
    flex-grow: 1;

    & div {
      font-size: 12px;
      color: rgba(39, 47, 90, 0.65);
    }

    & span {
      color: rgba(39, 47, 90, 0.45);
      margin-left: 8px;
    }
  }
`

const StageItem = ({
  number,
  name,
  status,
  type,
  closingTime,
  perpetrator = {}
}) =>
  styled(stage)(
    <stage as="li" {...use({ status })}>
      <shape>
        {type === "Switch" ? (
          <Icon type="choise" />
        ) : status === "Done" ? (
          <Icon type="ok" />
        ) : (
          number
        )}
      </shape>
      <content>
        {name}
        {status === "Done" && (
          <div>
            {perpetrator.name}
            <span>{new Date(closingTime).toLocaleDateString()}</span>
          </div>
        )}
      </content>
    </stage>
  )
