import React, { useEffect, useState, useContext } from "react"
import styled from "reshadow/macro"
import { Link } from "react-router-dom"

import { method } from "services/api"
import { Button as AntButton, Input, Select as AntSelect } from "antd"
import { paper, breadcrumbs } from "styles"

import { CompanyPageContext } from "./index"

const { Option } = AntSelect

const initialState = {
  lastName: "",
  firstName: "",
  middleName: "",
  depatment: "",
  position: "",
  number: "",
  cellnumber: "",
  email: ""
}

const fields = [
  { name: "lastName", label: "Фамилия" },
  { name: "firstName", label: "Имя" },
  { name: "middleName", label: "Отчество" },
  { name: "depatment", label: "Отдел" },
  { name: "position", label: "Должность" },
  { name: "number", label: "Внутренний номер сотрудника" },
  { name: "email", label: "Адрес электронной почты (логин)" },
  { name: "cellnumber", label: "Контактный номер" }
]

export const UserTemplate = ({ match, history }) => {
  const isCreate = match.params.userId === "create"
  const { state, dispatch } = useContext(CompanyPageContext)
  const [values, setValues] = useState(initialState)
  // eslint-disable-next-line no-unused-vars
  const [userRoles, setUserRoles] = useState([])
  const [touched, setTouched] = useState(false)
  const [createData, setCreateData] = useState(null)
  const [putData, setPutData] = useState(null)

  useEffect(() => {
    if (!state.roles.length) {
      method.get("UserRoles").then(data => {
        dispatch({ type: "GET_STATE", payload: { roles: data.items } })
      })
    }

    if (!isCreate) {
      method.get("ManagingFirmUsers/" + match.params.userId).then(data => {
        console.log(data)
        const { managementFirm, ...values } = data

        const userRoles = state.roles.map(item => "q")
        setUserRoles(userRoles)
        setValues(values)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (createData) {
      method.post("ManagingFirmUsers", createData).then(newItem => {
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
        .put("ManagingFirmUsers/" + match.params.userId, { ...data })
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
    console.log(e.target.name)
    setValues({ ...values, [e.target.name]: e.target.value })
    if (!isCreate && !touched) setTouched(true)
  }

  const handleChangeSelect = id => {
    console.log(id)
  }

  const isDidabled = () => {
    if (isCreate) {
      return (
        !values.lastName ||
        !values.firstName ||
        !values.middleName ||
        !values.email ||
        !values.depatment ||
        !values.position ||
        !values.number ||
        !values.cellnumber
      )
    }
    return !touched
  }

  return styled(paper, breadcrumbs)`
    form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: inherit;

      & > :nth-child(9),
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
        {isCreate
          ? "Добавление пользователя"
          : `${values.lastName} ${values.firstName}`}
      </h1>
      <paper>
        <form onSubmit={handleSubmit}>
          {fields.map(field => (
            <label key={field.name}>
              <span>{field.label}</span>
              <Input
                size="large"
                name={field.name}
                value={values[field.name]}
                onChange={handleChange}
              />
            </label>
          ))}
          <label>
            <span>Роль в системе</span>
            <AntSelect
              size="large"
              mode="multiple"
              placeholder="Выберите роль пользователя в системе"
              defaultValue={[]}
              labelInValue
              onChange={handleChangeSelect}
            >
              {state.roles.map(item => (
                <Option key={item.id}>{item.name}</Option>
              ))}
            </AntSelect>
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
              onClick={() => history.replace("/company#users")}
            >
              Отмена
            </AntButton>
          </div>
        </form>
      </paper>
    </>
  )
}
