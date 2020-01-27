import React from "react"
import styled from "reshadow/macro"

import { Icon } from "components"

export const Documents = ({ data = [] }) => {
  if (!data.length) return null

  return styled`
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-gap: 8px;
    }

    document {
      padding: 16px 24px;
      border-radius: 4px;
      background-color: #fff;
      align-items: center;
      display: inherit;
      grid-template-columns: 3fr 1fr 1fr;
    }

    div, a{
      display: flex;
      align-items: center;
    }
    
    div {
      color: rgba(39, 47, 90, 0.65);
    }
    
    a {
      cursor: pointer;
    }

    Icon {
      margin-right: 8px;
    }


  `(
    <ul>
      {data.map(document => (
        <document as="li" key={document.id}>
          <a href={document.url} target="_blank" rel="noreferrer noopener">
            <Icon type="doc" />
            {document.name}
          </a>
          <div>
            <Icon type="username" />
            {document.author}
          </div>
          <div>
            <Icon type="calendar" />
            {new Date(document.uploadingTime).toLocaleDateString("ru", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric"
            })}
          </div>
        </document>
      ))}
    </ul>
  )
}
