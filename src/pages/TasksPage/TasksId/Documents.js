import React, { useState, useEffect } from "react"
import styled from "reshadow/macro"

import { method } from "services/api"
import { Icon } from "components"

export const Documents = ({ data = [], url, remoteDocument = () => {} }) => {
  const [documentId, setDocumentId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (documentId) {
      setLoading(true)
      method.delete(url + documentId).then(() => {
        remoteDocument(documentId)
        setLoading(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId])

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
      position: relative;
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

    icon {
      position: absolute;
      top: 50%;
      right: 24px;
      transform: translateY(-50%);
      margin: 2px;
      cursor: pointer;
      color: rgba(39, 47, 90, 0.65);

      &:hover {
        color: #ED3B45;
      }
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
          {document.canBeEdited && (
            <icon onClick={() => !loading && setDocumentId(document.id)}>
              <Icon type="del" />
            </icon>
          )}
        </document>
      ))}
    </ul>
  )
}
