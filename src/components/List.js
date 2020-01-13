import React from "react"
import styled from "reshadow/macro"

import { Empty } from "components/Empty"
import {Loader} from 'components/Loader'

export const List = ({
  data = [],
  loading = false,
  renderItem = () => {},
  emptyText="",
  ...props
}) => {
  if (loading) return <Loader />
  if (!data.length) return <Empty emptyText={emptyText}/>
  return styled`
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  `(<ul {...props}>{data.map(renderItem)}</ul>)
}
