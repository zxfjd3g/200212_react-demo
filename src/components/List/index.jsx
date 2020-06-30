import React, { Component } from 'react'
import PropTpes from 'prop-types'
import './index.css'

import Item from '@/components/Item'

/* 
列表组件
*/
export default class List extends Component {

  static propTypes = {
    todos: PropTpes.array.isRequired
  }

  render() {
    const {todos} = this.props

    return (
      <ul className="todo-main">
        {
          todos.map(todo => <Item key={todo.id} todo={todo}/>)
        }
      </ul>
    )
  }
}
