import React, { useState } from "react"
import { useParams } from "react-router-dom"
import styled from "reshadow/macro"
import { Button } from "antd"

import { useSelect } from "hooks"

export const Switch = ({ push }) => {
  const [nextStageId, setNextStageId] = useState(null)
  const { taskId } = useParams()

  const { select } = useSelect({
    name: "Выбор дальнейшего действия",
    url: `Tasks/${taskId}/NextStages`,
    placeholder: "Выбирите действие",
    onChange: id => setNextStageId(Number(id))
  })
  return styled`
    row {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: 16px;
      align-items: end;
    }
  `(
    <row>
      {select}
      <Button
        type="primary"
        size="large"
        disabled={!nextStageId}
        onClick={() => push({ pushData: { nextStageId } })}
      >
        Завершить этап
      </Button>
    </row>
  )
}
