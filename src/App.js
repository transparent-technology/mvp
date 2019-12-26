import React, { useReducer } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { Layout } from "components"
import {
  LoginPage,
  TasksPage,
  ObjectPage,
  UserSettingPage,
  CompanyPage
} from "pages"

import { AppContext } from "contex"

export default () => {
  const [state, dispatch] = useReducer(() => {}, {})

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ state, dispatch }}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Layout>
            <Switch>
              <Route path="/" render={() => <Redirect to="/tasks" />} exact />
              <Route path="/tasks" component={TasksPage} />
              <Route path="/objects" component={ObjectPage} />
              <Route path="/profile" component={UserSettingPage} />
              <Route path="/company" component={CompanyPage} />
              <Route path="*" render={() => "not fount"} />
            </Switch>
          </Layout>
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  )
}
