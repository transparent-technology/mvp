import React, { useState, useContext } from "react"
import styled from "reshadow/macro"

import { avatar, comment } from "styles"
import { Icon } from "components"
import { Input, Button as AntButton, Popconfirm } from "antd"
import { CommentContext } from "./context"

const { TextArea } = Input

export const CommentListItem = ({
  author,
  text,
  createdAt,
  id,
  canBeEdited
}) => {
  const [edit, setEdit] = useState("")
  const { dispatch } = useContext(CommentContext)

  return styled(avatar, comment)`
    wrap {
      align-self: center;
    }

    Icon {
      cursor: pointer;

      &:hover {
        color: #189ee9;
      }

      & + Icon {
        margin-left: 8px;
      }
    }

    AntButton {
      margin-top: 8px;

      & + AntButton {
        margin-left: 8px;
      }
    }
  `(
    <comment_wrap as="li">
      <avatar>
        <Icon type="username" />
      </avatar>
      <div>
        <comment_header>
          {author} <time>{createdAt}</time>
        </comment_header>
        {edit ? (
          <>
            <TextArea autoSize value={edit} />
            <AntButton size="small" onClick={() => setEdit("")}>
              Отмена
            </AntButton>
            <AntButton size="small" type="primary">
              Сохранить
            </AntButton>
          </>
        ) : (
          text
        )}
      </div>
      {canBeEdited && !edit && (
        <wrap>
          <Icon type="edit" role="button" onClick={() => setEdit(text)} />
          <Popconfirm
            title="Вы хотите удалить комментарий?"
            cancelText="Нет"
            okText="Да"
            onConfirm={() => dispatch({ type: "push_delete", payload: id })}
          >
            <Icon type="del" role="button" />
          </Popconfirm>
        </wrap>
      )}
    </comment_wrap>
  )
}
