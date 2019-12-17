import React, { useState } from "react"
import styled from "reshadow/macro"
import { Button } from "antd"

import { useSelect } from "hooks"

export const ChooseExecutorAndNotify = ({ push }) => {
  const [nextPerpetratorId, setNextPerpetratorId] = useState(null)
  console.log(nextPerpetratorId)

  const { select: executorSelect } = useSelect({
    url: "ManagingFirmUsers",
    name: "Исполнитель",
    placeholder: "Выбирите исполнителя",
    taskCount: true,
    onChange: id => setNextPerpetratorId(Number(id))
  })

  const { select: contractorsSelect } = useSelect({
    url: "Contractors",
    name: "Получатели пригласительного письма",
    placeholder: "Выбирите кому отправить пригласительного письма"
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
        {contractorsSelect}
        <Button
          size="large"
          type="primary"
          disabled={!nextPerpetratorId}
          onClick={() => push({ pushData: { nextPerpetratorId } })}
        >
          Завершить этап
        </Button>
      </row>
    </>
  )
}
