import React from "react"
import { Button, Input } from "antd"

import { ChooseExecutorAndNotify } from "./ChooseExecutorAndNotify"
import { UploadDocument } from "./UploadDocument"
import { Switch } from "./Switch"
import { ChooseExecutorAndSwitch } from "./ChooseExecutorAndSwitch"

export const TaskPanel = ({ currentStage, userStatus, push, loading }) => {
  if (!loading) return "...loading"
  if (!currentStage) return null
  if (userStatus === "Observer")
    return (
      <Input
        defaultValue={currentStage.perpetrator.name}
        disabled
        size="large"
      />
    )
  // console.log("action ======>", currentStage.action)

  switch (currentStage.action) {
    case "ChooseExecutorAndNotify":
      return <ChooseExecutorAndNotify />
    case "ChooseExecutorAndSwitch":
      return <ChooseExecutorAndSwitch />
    case "Switch":
      return <Switch />
    case "UploadDocument":
      return <UploadDocument />
    case "Completion":
      return (
        <Button
          style={{ justifySelf: "start" }}
          type="primary"
          size="large"
          onClick={() => push({ pushData: {} })}
        >
          Завершить этап
        </Button>
      )
    default:
      return null
  }
}
