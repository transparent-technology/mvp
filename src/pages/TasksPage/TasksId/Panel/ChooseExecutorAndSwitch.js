import React, { useState } from "react"
import styled from "reshadow/macro"
import { useParams } from "react-router-dom"
import { Button } from "antd"

import { useSelect } from "hooks"

export const ChooseExecutorAndSwitch = ({ push }) => {
  const [nextPerpetratorId, setNextPerpetratorId] = useState(null)
  const [nextStageId, setNextStageId] = useState(null)

  const { taskId } = useParams()

  const { select: executorSelect } = useSelect({
    url: "ManagingFirmUsers",
    name: "Исполнитель",
    placeholder: "Выберите исполнителя",
    taskCount: true,
    onChange: id => setNextPerpetratorId(Number(id))
  })

  const { select } = useSelect({
    name: "Выбор дальнейшего действия",
    url: `Tasks/${taskId}/NextStages`,
    placeholder: "Выберите действие",
    onChange: id => setNextStageId(Number(id))
  })

  return styled`
  row {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 1fr 1fr auto;
    align-items: end;
  }
  
  AntSelect {
    width: 100%;
  }
  `(
    <>
      <row>
        {executorSelect}
        {select}
        <Button
          size="large"
          type="primary"
          disabled={!nextPerpetratorId || !nextStageId}
          onClick={() => push({ nextPerpetratorId, nextStageId })}
        >
          Завершить этап
        </Button>
      </row>
    </>
  )
}
