import React, { useReducer, useEffect } from "react"
import styled from "reshadow/macro"

import { method } from "services/api"
import { paper } from "styles"
import { CommentContext } from "./context"
import { CommentListItem } from "./CommentListItem"
import { CommentCreator } from "./CommentCreator"
import reducer from "./reducer"

export const Comments = ({
  url = "",
  data = null,
  showCreator = false,
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, {
    url,
    comments: [],
    create: null,
    edit: null,
    deleteId: null,
    loading: false
  })

  const { comments, create, edit, deleteId } = state

  useEffect(() => {
    if (data) {
      dispatch({ type: "upload", payload: { comments: data } })
    }
  }, [data])

  useEffect(() => {
    if (create) {
      method
        .post(url, JSON.stringify(create))
        .then(item => dispatch({ type: "add_comment", payload: item }))
    }

    if (edit) {
      method
        .put(url + "/" + edit.id, JSON.stringify(edit.value))
        .then(item => dispatch({ type: "add_edit_comment", payload: item }))
    }

    if (deleteId) {
      method.delete(url + "/" + deleteId).then(() => {
        dispatch({
          type: "upload",
          payload: {
            loading: false,
            deleteId: null,
            comments: comments.filter(item => item.id !== deleteId)
          }
        })
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [create, edit, deleteId, url])

  return styled(paper)(
    <CommentContext.Provider value={{ state, dispatch }}>
      <paper {...props}>
        <h3>
          {!comments.length
            ? "Комментарии"
            : `Комментарии (${comments.length})`}
        </h3>
        <CommentList comments={state.comments} />
        {showCreator && <CommentCreator />}
      </paper>
    </CommentContext.Provider>
  )
}

const CommentList = ({ comments }) => {
  if (!comments.length) return "...empty"
  return styled`
    ul {
      display: grid;
      grid-gap: 10px;
    }
  `(
    <ul>
      {comments.map(comment => (
        <CommentListItem key={comment.id} {...comment} />
      ))}
    </ul>
  )
}
