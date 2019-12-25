import React, { useState, useEffect } from "react"
import { Button, Input } from "antd"

import { ChooseExecutorAndNotify } from "./ChooseExecutorAndNotify"
import { UploadDocument } from "./UploadDocument"
import { Switch } from "./Switch"
import { ChooseExecutorAndSwitch } from "./ChooseExecutorAndSwitch"
import { method } from "services/api"

export const Panel = ({
  currentStage,
  userStatus,
  update,
  loadingPage,
  url
}) => {
  const [loading, setLoading] = useState(loadingPage)
  const [pushData, setPushData] = useState(null)

  useEffect(() => setLoading(loadingPage), [loadingPage])

  useEffect(() => {
    let mount = true
    if (pushData) {
      setLoading(true)
      method.post(url + "/PushStage", pushData).then(res => {
        update(res)
        if (mount) {
          setLoading(false)
          setPushData(null)
        }
      })
    }
    return () => (mount = false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pushData])

  if (loading) return "...loading"
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
      return <ChooseExecutorAndNotify push={setPushData} />
    case "ChooseExecutorAndSwitch":
      return <ChooseExecutorAndSwitch push={setPushData} />
    case "Switch":
      return <Switch push={setPushData} />
    case "UploadDocument":
      return <UploadDocument push={setPushData} />
    case "Completion":
      return (
        <Button
          style={{ justifySelf: "start" }}
          type="primary"
          size="large"
          onClick={() => setPushData({})}
        >
          Завершить этап
        </Button>
      )
    default:
      return null
  }
}
