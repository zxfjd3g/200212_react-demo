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
  state = { // 需要更新显示的数据放在state中
    todos: [ 
      // {id: 1, title: 'aa', completed: false},
      {id: 1, title: '吃饭', completed: false},
      {id: 2, title: '睡觉', completed: true},
      {id: 3, title: '打代码', completed: false},
    ],
  }

  id = 4  // 给组件对象添加一个id属性  它与界面无关   不需要它是响应式的

  /* 
  添加TODO
  */
  addTodo = (title) => {
    // 创建一个新的todo
    const todo = {
      // id: Date.now(),
      id: this.id++,
      title,
      completed: false
    }

    // 添加到todos中去
    /* 错误做法: 直接修改的状态数据 */
    // const {todos} = this.state
    // todos.unshift(todo) // 直接修改的状态数据  ==> 不要这么做

    /* 正确做法: 产生新的状态数据 */
    const todos = [todo, ...this.state.todos] // 没有直接修改原状态数据todos

    // 更新状态
    this.setState({todos})
  }

  /* 
  删除指定id的TODO
  */
  deleteTodo = (id) => {
    // 得到一个todos新状态
    const todos = this.state.todos.filter(todo => todo.id!==id)

    // 更新状态
    this.setState({todos})
  }

  /* 
  更新指定id的todo的completed值
  */
  updateTodo = (id, checked) => {
  // 得到一个todos新状态
  const todos = this.state.todos.map(todo => {
    // id对应的todo, 要产生一个新的todo, 其它todo不用变
    if (id===todo.id) {
      return {...todo, completed: checked}
    } 
    return todo
  })

  // 更新状态
  this.setState({todos})
  }

  render() {
    const {todos} = this.state
    return (
      <div className="todo-container">
      <div className="todo-wrap">
        <Header addTodo={this.addTodo}/>
        <List todos={todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo}/>
        <Footer />
       </div>
    </div>
    )
  }
}
