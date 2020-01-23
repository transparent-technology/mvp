import React, { createContext, useReducer } from "react"
import { Route } from "react-router-dom"

import { CompanyProfile } from "./CompanyProfile"
import { UserTemplate } from "./UserTempate"
import { ContractorTemplate } from "./ContractorTemplate"

export const CompanyPageContext = createContext()

const initialState = {
  companyInfo: null,
  contractors: [],
  users: [],
  roles: [],
  loading: false
}

export const CompanyPage = ({ match }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const { type, payload } = action
    switch (type) {
      case "GET_STATE":
        return { ...state, ...payload }
      case "ADD_NEW_ITEM":
        return {
          ...state,
          contractors: [...state[payload.array], payload.newItem]
        }
      case "ADD_EDIT_ITEM":
        const editAray = state[payload.array].map(item =>
          item.id === payload.item.id ? payload.item : item
        )
        return { ...state, [payload.array]: editAray }
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
