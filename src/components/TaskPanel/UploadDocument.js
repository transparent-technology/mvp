import React, { useState, useRef } from "react"
import styled, { css } from "reshadow/macro"
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
  }

  Icon {
    margin-right: 8px;
  }
`

export const UploadDocument = () => {
  const [files, setFiles] = useState([])
  const input = useRef(null)

  const handleChange = () => {
    if (input.current.files.length) {
      let dataFile = new FormData()
      dataFile.append("file", input.current.files[0])
      method.post("Documents/upload", dataFile).then(console.log)
      console.log(input.current.files[0].name)
    }
  }

  return styled(styles)(
    <row>
      <upload as="label">
        <btn as="div">
          <Icon type="upload" />
          Загрузить файл
        </btn>
        <input type="file" ref={input} onChange={handleChange} />
      </upload>
      <div>line</div>
      <Button type="primary" size="large">
        Завершить этап
      </Button>
    </row>
  )
}
