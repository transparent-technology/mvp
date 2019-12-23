import React from "react"
import styled from "reshadow/macro"

export const List = ({ data = [], loading = true, renderItem = () => {} }) => {
  if (loading) return "loading"
  if (!data.length) return "empty"
  return styled`
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  `(<ul>{data.map(renderItem)}</ul>)
}
