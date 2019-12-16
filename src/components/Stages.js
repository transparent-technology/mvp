import React from "react"
import styled from "reshadow/macro"

import { paper } from "styles"

export const Stages = ({ stages = [] }) => {
  console.log(stages)
  if (!stages.length) return "loading..."
  return styled(paper)(
    <paper>
      <h3>Этапы выполнения</h3>
      <ul>
        {stages.map(stage => (
          <StageItem key={stage.id} />
        ))}
      </ul>
    </paper>
  )
}

const StageItem = () => <li>1</li>
