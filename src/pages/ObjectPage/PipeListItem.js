import React from "react"
import styled from "reshadow/macro"

export const PipeListItem = ({
  number,
  entryNumber,
  hubNumber,
  material,
  plotLength,
  magistral
}) => {
  return styled`
    li {
      border-bottom: 1px solid #d9d9d9;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 12px 0;
    }

    li > span:first-child {
      color: rgba(39, 47, 90, 0.45);
    }
  `(
    <>
      <li>
        <span>Номер трубы</span>
        <span>{number}</span>
      </li>
      <li>
        <span>Номер ввода</span>
        <span>{entryNumber}</span>
      </li>
      <li>
        <span>Магистраль</span>
        <span>{magistral === "FeedFlow" ? "Подающая" : "Обратная"}</span>
      </li>
    </>
  )
}
