import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import MyNavLink from '@/components/MyNavLink'

import News from '@/pages/News'
import Message from '@/pages/Message'

/* 
Home路由组件
*/
export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home组件内容</h2>
        <ul className="nav nav-tabs">
          <li>
            <MyNavLink to="/home/news">
              News
              {/* <span>News</span>
              <span>News</span> */}
            </MyNavLink>
          </li>
          <li><MyNavLink to="/home/message">Message</MyNavLink></li>
        </ul>
        <div>
          {/* 二级路由界面在此显示 */}
          <Switch>
            <Route path="/home/news" component={News}></Route>
            <Route path="/home/message" component={Message}></Route>
            <Redirect to="/home/news"/>
          </Switch>
        </div>
      </div>
    )
  }
}
