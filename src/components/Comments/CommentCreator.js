import React, { useContext } from "react"
import styled from "reshadow/macro"

import { Input, Button as AntButton } from "antd"
import { Icon } from "components"
import { avatar, comment } from "styles"
import { CommentContext } from "./context"

export const CommentCreator = React.memo(() => {
  const { dispatch, state } = useContext(CommentContext)
  const { value } = state

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
          onChange={e => {
            dispatch({ type: "create_comment", payload: e.target.value })
          }}
        />
        <div>
          <AntButton size="small">Добавить комментарии</AntButton>
        </div>
      </div>
    </comment_wrap>
  )
})
