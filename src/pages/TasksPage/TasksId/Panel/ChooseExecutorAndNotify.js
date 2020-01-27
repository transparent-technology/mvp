import React, { useState } from "react"
import styled from "reshadow/macro"
import { Button } from "antd"

import { useSelect } from "hooks"

export const ChooseExecutorAndNotify = ({ push }) => {
  const [nextPerpetratorId, setNextPerpetratorId] = useState(null)
  const [contractorsIds, setContractorsId] = useState([])

  const { select: executorSelect } = useSelect({
    url: "ManagingFirmUsers",
    name: "Исполнитель",
    placeholder: "Выбeрите исполнителя",
    taskCount: true,
    onChange: id => setNextPerpetratorId(Number(id))
  })

  const { select: contractorsSelect } = useSelect({
    url: "Contractors",
    name: "Получатели пригласительного письма",
    placeholder: "Выбeрите кому отправить письмo",
    mode: "multiple",
    onChange: ids => setContractorsId(ids)
  })

  console.log(contractorsIds)
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
          onClick={() =>
            push({
              nextPerpetratorId,
              emailNotify: { contractorsIds: contractorsIds.map(item => +item) }
            })
          }
        >
          Завершить этап
        </Button>
      </row>
    </>
  )
}
