import * as React from 'react'
import { Route } from 'react-router-dom'

import { Home } from '../components/Home'
import { List } from '../components/project/List'
import { Details } from '../components/project/Details'
import { Login } from "../components/login/Login";

const routers = (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/project/list" component={List} />
    <Route path="/project/details/:id" component={Details} />
    <Route path="/login" component={Login}></Route>
  </div>
);

export default routers