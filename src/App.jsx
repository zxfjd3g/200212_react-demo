import React, { Component } from 'react'

import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'

/* 
应用主组件
1. 处理标签的class属性: 改为className
2. 处理标签的style属性: 属性值必须用{{}}
*/
export default class App extends Component {
  state = {
    todos: [
      {id: 1, title: '吃饭', completed: false},
      {id: 2, title: '睡觉', completed: true},
      {id: 3, title: '打代码', completed: false},
    ]
  }

  render() {
    const {todos} = this.state
    return (
      <div className="todo-container">
      <div className="todo-wrap">
        <Header />
        <List todos={todos}/>
        <Footer />
       </div>
    </div>
    )
  }
}
