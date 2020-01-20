import React, { useEffect, useState } from "react"
import styled from "reshadow/macro"
import { Link } from "react-router-dom"

import { method } from "services/api"
import { Button as AntButton } from "antd"
import { paper, breadcrumbs } from "styles"
import { useInput } from "hooks"

export const ContractorTemplate = ({ match }) => {
  const { contractorId } = match.params
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: ""
  })
  const [changeSettings, setChangeSettings] = useState(false)

  const companyName = useInput({ name: "companyName", value: user.name })
  // const email = useInput({ name: "email", value: user.email })

  useEffect(() => {
    if (contractorId !== "create") {
      method.get(`Contractors​/${contractorId}`).then(setUser)
    }
  }, [contractorId])

  useEffect(() => {
    if (changeSettings) {
      method.post(`Contractors​/${contractorId}`, user).then(console.log)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeSettings])

  return styled(paper, breadcrumbs)`
    paper {
      grid-template-columns: 1fr 1fr 1fr;

      & > :first-child,
      & > :last-child {
        grid-column: 1 / -1;
      }
    }

    AntButton + AntButton {
      margin-left: 16px;
    }
  `(
    <>
      <breadcrumbs>
        <Link to="/company#users">Профиль компании</Link>
      </breadcrumbs>
      <h1>
        {contractorId !== "create"
          ? `${user.firstName} ${user.lastName}`
          : "Добавление нового подрядчика"}
      </h1>
      <paper>
        
        {companyName.input}
        {/* {email} */}
        <div>
          <AntButton
            size="large"
            type="primary"
            onClick={() => setChangeSettings(true)}
          >
            Сохранить
          </AntButton>
          <AntButton size="large">Отмена</AntButton>
        </div>
      </paper>
    </>
  )
}
