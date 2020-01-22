import React, { useEffect, useState, useContext } from "react"
import styled from "reshadow/macro"
import { Link } from "react-router-dom"

import { method } from "services/api"
import { Button as AntButton, Input } from "antd"
import { paper, breadcrumbs } from "styles"

import { CompanyPageContext } from "./index"

const initialState = {
  email: "",
  name: ""
}

export const ContractorTemplate = ({ match, history }) => {
  const isCreate = match.params.contractorId === "create"
  const { state, dispatch } = useContext(CompanyPageContext)
  const [values, setValues] = useState(initialState)
  const [touched, setTouched] = useState(false)
  const [createData, setCreateData] = useState(null)
  const [putData, setPutData] = useState(null)

  useEffect(() => {
    if (!isCreate) {
      method
        .get("Contractors/" + match.params.contractorId)
        .then(contractor => {
          setValues(contractor)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (createData) {
      method.post("Contractors", createData).then(newItem => {
        if (state.contractors.length) {
          dispatch({
            type: "ADD_NEW_ITEM",
            payload: { array: "contractors", newItem }
          })
        }
        history.push("/company#contractors")
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createData])

  useEffect(() => {
    if (putData) {
      const { id, ...data } = values
      method
        .put("Contractors/" + match.params.contractorId, { ...data })
        .then(item => {
          dispatch({
            type: "ADD_EDIT_ITEM",
            payload: { array: "contractors", item }
          })
          setTouched(false)
          history.push("/company#contractors")
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [putData])

  const handleSubmit = e => {
    e.preventDefault()
    isCreate ? setCreateData(values) : setPutData(values)
  }

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
    if (!isCreate && !touched) setTouched(true)
  }

  const isDidabled = () => {
    if (isCreate) {
      return !values.name || !values.email
    }
    return !touched
  }

  return styled(paper, breadcrumbs)`
    form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: inherit;

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
      <h1>{isCreate ? "Добавление подрядчика" : values.name}</h1>
      <paper>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Название</span>
            <Input
              size="large"
              name="name"
              placeholder="Введите название компании"
              value={values.name}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Адрес элестронной почты</span>
            <Input
              size="large"
              name="email"
              placeholder="Эл. почта компании"
              value={values.email}
              onChange={handleChange}
            />
          </label>
          <div>
            <AntButton
              size="large"
              type="primary"
              htmlType="submit"
              disabled={isDidabled()}
            >
              Сохранить
            </AntButton>
            <AntButton
              size="large"
              onClick={() => history.replace("/company#contractors")}
            >
              Отмена
            </AntButton>
          </div>
        </form>
      </paper>
    </>
  )
}
