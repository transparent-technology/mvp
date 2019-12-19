import React, { useContext, useState, useEffect } from "react"
import styled from "reshadow/macro"

import { Input, Button as AntButton } from "antd"
import { Icon } from "components"
import { avatar, comment } from "styles"
import { CommentContext } from "./context"

export const CommentCreator = () => {
  const [value, setValue] = useState("")
  const { dispatch, state } = useContext(CommentContext)
  const { loading } = state

  useEffect(() => {
    if (!loading) {
      setValue("")
    }
  }, [loading])

  return styled(avatar, comment)`
    AntButton {
      margin-top: 8px;
    }
  `(
    <comment_wrap>
      <avatar>
        <Icon type="username" />
      </avatar>
      <div>
        <Input.TextArea
          autoSize
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={loading}
        />
        <div>
          <AntButton
            size="small"
            loading={loading}
            onClick={() =>
              value.trim() &&
              dispatch({ type: "create_comment", payload: value })
            }
          >
            Добавить комментарии
          </AntButton>
        </div>
      </div>
    </comment_wrap>
  )
}
