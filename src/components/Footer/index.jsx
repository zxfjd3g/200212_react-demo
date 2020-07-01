import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

/* 
底部组件
*/
export default class Footer extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    checkAllTodos: PropTypes.func.isRequired,
    deleteCompletedTodos: PropTypes.func.isRequired,
  }

  handleChange = (e) => {
    // 根据当前勾选状态更新父组件的todos
    this.props.checkAllTodos(e.target.checked)
  }

  deleteCompletedTodos = () => {
    if (window.confirm('确定清除吗?')) {
      this.props.deleteCompletedTodos()
    }
  }
  
  render() {
    const {todos} = this.props
    // 全部数量
    const totalCount = todos.length
    // 计算完成的数量
    const completedCount = todos.reduce((pre, todo) => pre + (todo.completed ? 1 : 0), 0)
    // 计算是否选中
    const checked = totalCount===completedCount && totalCount>0

    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={checked} onChange={this.handleChange}/>
        </label>
        <span>
        <span>已完成{completedCount}</span> / 全部{totalCount}
        </span>
        {completedCount>0 ? <button className="btn btn-danger" onClick={this.deleteCompletedTodos}>清除已完成任务</button> : null}
      </div>
    )
  }
}

/* 
1. 显示
  全部数量
  完成数量
  按钮是否显示
  是否勾选

2. 删除已完成的任务
3. 全选/全不选
*/