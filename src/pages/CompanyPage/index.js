import React, { createContext, useReducer } from "react"
import { Route } from "react-router-dom"

import { CompanyProfile } from "./CompanyProfile"
import { UserTemplate } from "./UserTempate"
import { ContractorTemplate } from "./ContractorTemplate"

export const CompanyPageContext = createContext()

const initialState = {
  companyInfo: null,
  contractors: null,
  users: null,
  loading: false
}

export const CompanyPage = ({ match }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "GET_STATE":
        return { ...state, ...action.payload }

      default:
        return state
    }
  }, initialState)
  console.log(state)

  return (
    <CompanyPageContext.Provider value={{ state, dispatch }}>
      <Route exact path={match.url} component={CompanyProfile} />
      <Route path={match.url + "/user/:userId"} component={UserTemplate} />
      <Route
        path={match.url + "/contractor/:contractorId"}
        component={ContractorTemplate}
      />
    </CompanyPageContext.Provider>
  )
}
