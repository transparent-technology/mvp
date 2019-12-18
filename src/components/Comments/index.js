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
    createComment: null
  })

  const { comments, createComment } = state

  useEffect(() => {
    if (data) {
      dispatch({ type: "upload", payload: data })
    }
  }, [data])

  useEffect(() => {
    if (createComment) {
      method.post(url, createComment)
    }
  }, [createComment, url])

  

  return styled(paper)(
    <CommentContext.Provider value={{ state, dispatch }}>
      <paper {...props}>
        <h3>
          {comments ? "Комментарии" : `Комментарии (${state.comments.length})`}
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
