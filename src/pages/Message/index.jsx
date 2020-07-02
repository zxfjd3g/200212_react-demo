import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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

  render() {
    const {messages} = this.state
    return (
     <ul>
       {
         messages.map((m) => (
          <li key={m.id}>
            <Link to="???">{m.title}</Link>
          </li>
         ))
       }
     </ul>
    )
  }
}
