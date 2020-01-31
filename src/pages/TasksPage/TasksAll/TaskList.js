/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import styled, { css } from "reshadow/macro"

import { Button, Modal } from "antd"
import { TasksAllListItem } from "./TasksAllListItem"
import { Checkbox, Icon } from "components"
const users = ["Иванов", "Петров", "Сидоров"]

export const TasksList = ({ styles, data = [], hash }) => {
  const [tasks, setTasks] = useState(data)
  const [checkboxGroup, setCheckboxGroup] = useState(false)
  const [checkedTaskIds, setCheckedTaskIds] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [executor, setExecutor] = useState("")
  const isEmpty = !!checkedTaskIds.length
  const [mapList, setMapList] = useState(new Map())

  useEffect(() => {
    const newMap = new Map(data.map(i => [i, false]))
    setTasks(data)
    setMapList(newMap)
  }, [data])

  console.log("map", mapList)
  useEffect(() => {
    setCheckedTaskIds([])
  }, [hash])

  useEffect(() => {
    if (checkedTaskIds.length) {
      setCheckboxGroup(true)
    } else {
      setCheckboxGroup(false)
    }
  }, [checkedTaskIds])

  const toggleCheck = (e, id) => {
    setMapList(mapList.set(id, !mapList.get(id)))
    if (e.target.checked) {
      setTasks(
        tasks.map(item => (item.id === id ? { ...item, checked: true } : item))
      )
      setCheckedTaskIds([...checkedTaskIds, id])
    } else {
      setTasks(
        tasks.map(item => (item.id === id ? { ...item, checked: false } : item))
      )
      setCheckedTaskIds(checkedTaskIds.filter(item => item !== id))
    }
  }

  const toggleGroupCheckbox = e => {
    if (tasks.length !== checkedTaskIds.length) {
      setCheckboxGroup(true)
      setTasks(tasks.map(item => ({ ...item, checked: true })))
      setCheckedTaskIds(tasks.map(item => item.id))
    } else {
      setCheckboxGroup(false)
      setCheckedTaskIds([])
      setTasks(tasks.map(item => ({ ...item, checked: false })))
    }
  }

  const modalProps = {
    visible: showModal,
    onCancel: () => setShowModal(false),
    onOk: () => console.log(1),
    cancelText: "Отмена",
    okText: "Назначить",
    title: "Назначение задачи"
  }

  return styled(styles)(
    <div>
      {hash !== "#Archived" && (
        <top>
          <Checkbox
            text="Все задачи"
            checked={checkboxGroup}
            allDone={tasks.length === checkedTaskIds.length}
            onChange={toggleGroupCheckbox}
          />
          <Button
            type="primary"
            disabled={!isEmpty}
            onClick={() => setShowModal(true)}
          >
            Назначить
          </Button>
        </top>
      )}
      <ul>
        {[...mapList.keys()].map(item => (
          <TasksAllListItem
            key={item.id}
            toggleCheck={e => toggleCheck(e, item)}
            {...item}
            checked={mapList.get(item)}
          />
        ))}
        {/* {tasks.map(item => (
          <TasksAllListItem
            key={item.id}
            toggleCheck={e => toggleCheck(e, item.id)}
            {...item}
          />
        ))} */}
      </ul>
      <Modal {...modalProps}>
        <modal as="ul">
          {users.map(user => (
            <li key={user} onClick={() => setExecutor(user)}>
              <input
                type="radio"
                name="executor"
                value={user}
                checked={user === executor}
                onChange={() => setExecutor(user)}
              />

              <fio>user</fio>
              <Icon type="task" />
              <taskcount>1234</taskcount>
            </li>
          ))}
        </modal>
      </Modal>
    </div>
  )
}

TasksList.defaultProps = {
  styles: css`
    ul,
    modal {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    top {
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      grid-gap: 24px;
    }

    modal {
      display: grid;
      grid-auto-rows: 54px;
    }

    li {
      border-bottom: 1px solid rgba(29, 38, 84, 0.15);
      display: flex;
      align-items: center;
      color: #272f5a;
    }
    fio {
      margin-left: 10px;
      margin-right: auto;
    }
    taskcount {
      margin-left: 10px;
      color: rgba(39, 47, 90, 0.65);
    }
  `
}
