import React, { useState, useRef, useEffect } from "react"
import styled, { css, use } from "reshadow/macro"
import { Button } from "antd"

import { method } from "services/api"
import { Icon } from "components"

const styles = css`
  row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 16px;
    align-items: center;
  }
  upload {
    position: relative;
    cursor: pointer;

    &:hover btn {
      color: #189ee9;
      border-color: #189ee9;
    }

    & input {
      outline: none;
      opacity: 0;
      pointer-events: none;
      user-select: none;
      width: 0;
      height: 0;
      position: absolute;
    }
  }

  btn {
    display: flex;
    align-items: center;
    padding: 0 16px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    height: 40px;
    background: #fff;
    & > Icon {
      margin-right: 8px;
    }
  }

  filerow {
    display: flex;
    & > * {
      margin-right: 8px;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  file,
  fileupload {
    display: flex;
    align-items: center;

    & > Icon {
      margin-left: 4px;
    }
    & > Icon[|animation] {
      animation: spin 2s infinite linear;
    }
    & > Icon[role="button"]:hover {
      color: red;
      cursor: pointer;
    }
  }
`

export const UploadDocument = ({ push }) => {
  const [file, setFile] = useState(null)
  const [items, setItems] = useState([])
  const [deleted, setDeleted] = useState(null)
  const input = useRef(null)

  useEffect(() => {
    if (file) {
      let dataFile = new FormData()
      dataFile.append("file", input.current.files[0])
      method.post("Documents/upload", dataFile).then(data => {
        setItems([...items, ...data])
        setFile(null)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  useEffect(() => {
    if (deleted) {
      method.delete(`Documents/${deleted}`).then(() => {
        setItems(items.filter(item => item.id !== deleted))
        setDeleted(null)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted])

  return styled(styles)(
    <row>
      <upload as="label">
        <btn as="div">
          <Icon type="upload" />
          Загрузить файл
        </btn>
        <input
          type="file"
          ref={input}
          onChange={() => setFile(input.current.files[0].name)}
        />
      </upload>
      <filerow>
        {items.map(item => (
          <fileupload key={item.id}>
            <a href={item.url} target="_blank" rel="noreferrer noopener">
              {item.name}
            </a>
            <Icon
              type="close"
              role="button"
              {...use({ animation: item.id === deleted })}
              onClick={() => setDeleted(item.id)}
            />
          </fileupload>
        ))}
        {file && (
          <file>
            {file}
            <Icon type="close" {...use({ animation: true })} />
          </file>
        )}
      </filerow>
      <Button
        type="primary"
        size="large"
        disabled={!items.length}
        onClick={() => push({ documentsIds: items.map(item => item.id) })}
      >
        Завершить этап
      </Button>
    </row>
  )
}
