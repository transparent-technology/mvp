import React from "react"
import { Route } from "react-router-dom"

import { CompanyProfile } from "./CompanyProfile"

export const CompanyPage = ({ match }) => (
  <>
    <Route path={match.url} component={CompanyProfile} />
  </>
)
