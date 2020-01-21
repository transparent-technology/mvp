import React, { useEffect, useState } from "react"
import styled from "reshadow/macro"
import { Link } from "react-router-dom"

import { method } from "services/api"
import { Button as AntButton, Input } from "antd"
import { paper, breadcrumbs } from "styles"

export const ContractorTemplate = ({ match, history }) => {
  const { contractorId } = match.params
  const [contractor, setContractor] = useState({
    id: "",
    email: "",
    name: ""
  })
  const [create, setCreate] = useState(false)
  const isCreate = contractorId === "create"

  useEffect(() => {
    if (contractorId !== "create") {
      method.get(`Contractors/${contractorId}`).then(setContractor)
    }
  }, [contractorId])

  useEffect(() => {
    if (create) {
      method.post(`Contractors`, create).then(console.log)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [create])

  const handleChange = e => {
    setContractor({
      ...contractor,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setCreate({ name: contractor.name, email: contractor.email })
  }

  return styled(paper, breadcrumbs)`
    form {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 32px;

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
        <Link to="/company#contractors">Профиль компании</Link>
      </breadcrumbs>
      <h1>{isCreate ? "Добавление нового подрядчика" : contractor.name}</h1>
      <paper>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Название</span>
            <Input
              size="large"
              name="name"
              value={contractor.name}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Адрес элестронной почты (логин)</span>
            <Input
              size="large"
              name="email"
              value={contractor.email}
              onChange={handleChange}
            />
          </label>
          <div>
            <AntButton
              size="large"
              type="primary"
              htmlType="submit"
              // disabled={!create}
            >
              Сохранить
            </AntButton>
            <AntButton size="large" onClick={() => history.goBack()}>
              Отмена
            </AntButton>
          </div>
        </form>
      </paper>
    </>
  )
}
