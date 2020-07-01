import React, { Component } from 'react'
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect} from 'react-router-dom'

import About from './pages/About'
import Home from './pages/Home'

/* 
1. 在外层用上<HashRouter> / <BrowserRouter>
2. 注册路由: 在需要显示路由组件界面的区域使用<Route>注册路由
3. 使用说明:
  HashRouter: hash路由, 路径带#, 刷新此咱路径提交的只是#前面的部分
  BrowserRouter: history路由, 路径不带#, 刷新此咱路径提交完整路径 ==> 404 ==> 配置webpack/nginx
  Route: 配置路由, path/compoent
  Switch: 不用Switch会渲染所有指定<Route>, 而使用Switch只渲染匹配的第一个路由的<Route>
  Redirect: 匹配任意, 一般放在最后==> 前面都不匹配就使用它
  NavLink: 导航路由链接, 当前路由链接就会有特定类名, 用来定义特定样式
  Link: 一般路由链接, 所有都一样, 用于不需要指定当前路由链接的特定样式的情况
*/
export default class App extends Component {

  
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="row">
            <div className="col-xs-offset-2 col-xs-8">
              <div className="page-header">
                <h2>Vue Router Demo</h2>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-xs-2 col-xs-offset-2">
              <div className="list-group">
                <NavLink className="list-group-item" activeClassName="myActive" to="/about">About</NavLink>
                <NavLink className="list-group-item" activeClassName="myActive" to="/home">Home</NavLink>
              </div>
            </div>
          
            <div className="col-xs-6">
              <div className="panel">
                <div className="panel-body">
                  {/* 在此注册一级路由 */}
                  <Switch>
                    <Route path="/about" component={About}/>
                    <Route path="/home" component={Home}/>
                    <Redirect to="/about"/>
                  </Switch>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
