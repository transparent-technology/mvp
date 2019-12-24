import React from "react"
import styled from "reshadow/macro"
import { formatedDate } from "services/date"

export const DeviceListItem = ({
  commercialAccountingDate,
  lastCheckingDate,
  futureCheckingDate,
  diameter
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
        <span>Постановка на учет</span>
        <span>{formatedDate(commercialAccountingDate)}</span>
      </li>
      <li>
        <span>Окончание срока эксплуотации</span>
        <span>{formatedDate(futureCheckingDate)}</span>
      </li>
      <li>
        <span>Последняя проверка приборов</span>
        <span>{formatedDate(lastCheckingDate)}</span>
      </li>
      {diameter && (
        <li>
          <span>Диаметр</span>
          <span>{diameter}</span>
        </li>
      )}
    </>
  )
}
