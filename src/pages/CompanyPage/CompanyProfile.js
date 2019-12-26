import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled, { use } from "reshadow/macro"

import { method } from "services/api"
import { paper, tabs } from "styles"

export const CompanyProfile = ({ location, history }) => {
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({})
  const { hash, pathname } = location

  useEffect(() => {
    // if (hash) {
    //   setLoading(true)
    //   setState(state => ({ ...state, items: [] }))
    //   method.get(`Tasks?GroupType=${hash.slice(1)}`).then(res => {
    //     setState(res)
    //     setLoading(false)
    //   })
    // }
  }, [hash])

  return styled(paper, tabs)`
    h1 {
      margin-top: 24px;
    }

    AntSelect {
      width: 200px;
      margin-left: 8px;
    }

    Icon {
      margin-bottom: -4px;
      margin-right: 8px;
    }
  `(
    <>
      <h1>Профиль компании</h1>
      <paper>
        <tabs>
          <Link to={{ hash: "" }} {...use({ pressed: hash === "" })}>
            Общие данные
          </Link>
          <Link to={{ hash: "users" }} {...use({ pressed: hash === "#users" })}>
            Сотрудники
          </Link>
          <Link
            to={{ hash: "contractors" }}
            {...use({ pressed: hash === "#contractors" })}
          >
            Подрядчики
          </Link>
        </tabs>
      </paper>
    </>
  )
}
