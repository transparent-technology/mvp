import React, { useState, useEffect } from "react"
import styled, { css, use } from "reshadow/macro"
import { Button as AntButton, Modal as AntModal, Input } from "antd"

import { Icon, List } from "components"
import { paper } from "styles"
import { method } from "services/api"

const getActiveStage = items => {
  let res
  items.forEach((item, i) => {
    if (item.status === "InProgress") {
      res = i
    }
  })
  return res
}

export const Stages = ({
  stages,
  isExecutor = false,
  update = () => {},
  url = ""
}) => {
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [revertStage, setRevertStage] = useState(false)
  const activeStageIndex = getActiveStage(stages)

  useEffect(() => {
    if (revertStage) {
      setLoading(true)
      method.post(url + "/RevertStage", { comment }).then(res => {
        setComment("")
        setLoading(false)
        update(res)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revertStage])

  const cancel = () => {
    setVisible(false)
  }

  const confirm = () => {
    setVisible(false)
    setRevertStage(true)
  }

  return styled(paper)`
    textarea {
      color: red;
    }
  `(
    <paper>
      <h3>Этапы выполнения</h3>
      <List
        data={stages}
        renderItem={(item, i) => (
          <StageItem
            key={item.id}
            index={i}
            showRevertBtn={activeStageIndex - 1 === i && isExecutor}
            onClick={() => setVisible(true)}
            loading={loading}
            {...item}
          />
        )}
      />
      <AntModal
        visible={visible}
        title={<h3>Возвращение задачи</h3>}
        onOk={confirm}
        onCancel={cancel}
      >
        <div>Вы можете оставить комментарий о причине возвращения.</div>
        <div>Это позволит оператору понять причину вашего решения</div>
        <br />
        <Input.TextArea
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </AntModal>
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
    padding-bottom: 24px;

    & div {
      font-size: 12px;
      color: rgba(39, 47, 90, 0.65);
    }

    & span {
      color: rgba(39, 47, 90, 0.45);
      margin-left: 8px;
    }
    & > AntButton {
      margin-top: 8px;
    }
  }
`

const StageItem = ({
  number,
  name,
  status,
  type,
  closingTime,
  showRevertBtn,
  perpetrator = {},
  onClick,
  loading
}) => {
  return styled(stage)(
    <stage as="li" {...use({ status })}>
      <shape>
        {type === "Switch" ? (
          <Icon type="choise" />
        ) : type === "Final" ? (
          <Icon type="finish" />
        ) : status === "Done" ? (
          <Icon type="ok" />
        ) : (
          number
        )}
      </shape>
      <content>
        {name}
        {status === "Done" && (
          <>
            <div>
              {perpetrator.name}
              <span>{new Date(closingTime).toLocaleDateString()}</span>
            </div>
            {showRevertBtn && (
              <AntButton size="small" onClick={onClick} loading={loading}>
                Вернуть этап
              </AntButton>
            )}
          </>
        )}
      </content>
    </stage>
  )
}
