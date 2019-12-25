import React, { useState, useEffect } from "react"
import styled from "reshadow/macro"

import { avatar, comment } from "styles"
import { Icon } from "components"
import { Input, Button as AntButton, Popconfirm } from "antd"
import { formatedDate } from "services/date"
import { method } from "services/api"

const { TextArea } = Input

export const CommentListItem = ({
  author,
  text,
  createdAt,
  id,
  canBeEdited,
  url = "",
  update,
  list
}) => {
  const [loading, setLoading] = useState(false)
  const [editValue, setEditValue] = useState("")
  const [create, setCreate] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const handleSave = () => {
    if (text === editValue) return setEditValue("")
    setCreate(editValue)
    setLoading(true)
  }

  useEffect(() => {
    if (create) {
      method.put(url + "/" + id, JSON.stringify(create)).then(res => {
        const editComments = list.map(item => (item.id === res.id ? res : item))
        setLoading(false)
        setEditValue("")
        setCreate(null)
        update({ comments: editComments })
      })
    }

    if (deleteId) {
      method.delete(url + "/" + id).then(() => {
        const deletedComments = list.filter(item => item.id !== id)
        setDeleteId(null)
        update({ comments: deletedComments })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [create, deleteId])

  return styled(avatar, comment)`
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
          {author} <time>{formatedDate(createdAt, { time: true })}</time>
        </comment_header>
        {editValue ? (
          <>
            <TextArea
              autoSize
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              disabled={loading}
            />
            <AntButton size="small" onClick={() => setEditValue("")}>
              Отмена
            </AntButton>
            <AntButton
              size="small"
              type="primary"
              onClick={handleSave}
              loading={loading}
            >
              Сохранить
            </AntButton>
          </>
        ) : (
          text
        )}
      </div>
      {canBeEdited && !editValue && (
        <wrap>
          <Icon type="edit" role="button" onClick={() => setEditValue(text)} />
          <Popconfirm
            title="Вы хотите удалить комментарий?"
            cancelText="Нет"
            okText="Да"
            onConfirm={() => setDeleteId(id)}
          >
            <Icon type="del" role="button" />
          </Popconfirm>
        </wrap>
      )}
    </comment_wrap>
  )
}
