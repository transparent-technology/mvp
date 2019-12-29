import React from "react"
import { Route } from "react-router-dom"

import { CompanyProfile } from "./CompanyProfile"
import { UserTemplate } from "./UserTempate"
import { ContractorTemplate } from "./ContractorTemplate"

export const CompanyPage = ({ match }) => (
  <>
    <Route exact path={match.url} component={CompanyProfile} />
    <Route path={match.url + "/user/:userId"} component={UserTemplate} />
    <Route
      path={match.url + "/contractor/:contractorId"}
      component={ContractorTemplate}
    />
  </>
)
