import React, { useState, useEffect } from "react"
import styled from "reshadow/macro"

import { Input, Button as AntButton } from "antd"
import { Icon } from "components"
import { avatar, comment } from "styles"
import { method } from "services/api"

export const CommentCreator = ({ url, list, update }) => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState("")
  const [createValue, setCreateValue] = useState(null)

  useEffect(() => {
    if (createValue) {
      setLoading(true)
      method.post(url, JSON.stringify(createValue)).then(res => {
        setLoading(false)
        setValue("")
        update({ comments: [...list, res] })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createValue])

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
            onClick={() => value.trim() && setCreateValue(value)}
          >
            Добавить комментарии
          </AntButton>
        </div>
      </div>
    </comment_wrap>
  )
}
