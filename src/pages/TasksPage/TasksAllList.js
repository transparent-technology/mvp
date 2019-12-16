import React from "react"
import styled, { use, css } from "reshadow/macro"

import {ReactComponent as MapIcon} from 'assets/icons/map.svg'

export const TasksAllList = ({ items = [] }) => {
  return (
    <ul>
      <TasksAllListItem />
    </ul>
  )
}

const tasksItemStyle = css`
  listitem {
    padding: 24px 0;
    border-bottom: 1px solid #d9d9d9;
    cursor: pointer;

    &:hover h4 {
      color: #189ee9;
    }
  }

  row {
    display: flex;
    align-items: center;
    & > *:not(last-child) {
      margin-right: 16px;
    }
  }

  rowitem {
    display: inherit;
    align-items: inherit;
    & > *:not(last-child) {
      margin-right: 8px;
    }

    &[|push] {
      margin-right: auto;
    }
  }
  i {
    margin-right: 8px;
  }
  h4 {
    margin-right: auto;
  }
`

const TasksAllListItem = () => {
  return styled(tasksItemStyle)(
    <listitem as="li">
      <row>
        <h4>hello</h4>
        hello
      </row>
      <row>
        <rowitem>
          <MapIcon />
          время на этап
        </rowitem>
        <rowitem>hello</rowitem>
      </row>
      <row>
        <rowitem>
          <i>a</i>
          device
        </rowitem>
        <rowitem {...use({ push: true })}>
          <i>a</i>
          address
        </rowitem>
        <rowitem>
          <i>a</i>
          number
        </rowitem>
        <rowitem>
          <i>a</i>
          date
        </rowitem>
      </row>
    </listitem>
  )
}
