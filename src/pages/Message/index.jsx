import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import MessageDetail from '@/pages/MessageDetail'
/* 
消息列表路由组件
*/
export default class Message extends Component {

  state = {
    messages: [
      {id: 1, title: 'message001'},
      {id: 3, title: 'message003'},
      {id: 5, title: 'message005'},
    ]
  }

  pushShow = (id) => {
    return () => {
      // 编程式路由跳转
      /* 
      携带参数
      1. params
      2. query
      3. state数据
      */
      this.props.history.push(
        `/home/message/detail/${id}?name=tom&age=12`, 
        {name: 'jack', age: 23}
      )
    }
  }

  replace = (id) => {
    this.props.history.replace(`/home/message/detail/${id}`)
  }

  render() {
    const {messages} = this.state
    return (
     <div>
       <ul>
        {
          messages.map((m) => (
            <li key={m.id}>
              <Link to={`/home/message/detail/${m.id}`}>{m.title}</Link>
              &nbsp;<button onClick={this.pushShow(m.id)}>push查看</button>
              &nbsp;<button onClick={() => this.replace(m.id)}>replace查看</button>
            </li>
          ))
        }
      </ul>

      <button onClick={() => this.props.history.goBack()}>返回</button>

      <hr/>

      {/* 注册显示三级路由 */}
      <Route path="/home/message/detail/:id" component={MessageDetail}/>

     </div>
    )
  }
}
