import React from "react"
import { Button } from "antd"

import { ChooseExecutorAndNotify } from "./ChooseExecutorAndNotify"
import { UploadDocument } from "./UploadDocument"
import { Switch } from "./Switch"

export const TaskPanel = ({ currentStage, closingTime, push }) => {
  if (!currentStage) return null

  if (currentStage.action === "ChooseExecutorAndNotify")
    return <ChooseExecutorAndNotify push={push} />
  if (currentStage.action === "UploadDocument")
    return <UploadDocument push={push} />
  if (currentStage.action === "Switch") return <Switch push={push} />
  if (currentStage.action === "Completion")
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

  return <div>loading...</div>
}
