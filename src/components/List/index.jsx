import React, { Component } from 'react'
import PropTpes from 'prop-types'
import './index.css'

import Item from '@/components/Item'

/* 
列表组件
*/
export default class List extends Component {

  static propTypes = {
    todos: PropTpes.array.isRequired,
    deleteTodo: PropTpes.func.isRequired,
    updateTodo: PropTpes.func.isRequired,
  }

  render() {
    const {todos, deleteTodo, updateTodo} = this.props

    return (
      <ul className="todo-main">
        {
          todos.map(todo => <Item key={todo.id} todo={todo} 
            deleteTodo={deleteTodo} updateTodo={updateTodo}/>)
        }
      </ul>
    )
  }
}
