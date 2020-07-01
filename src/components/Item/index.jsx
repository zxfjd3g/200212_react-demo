import React, { Component } from 'react'
import PropTpes from 'prop-types'
import './index.css'

/* 
列表项组件
*/
export default class Item extends Component {
  static propTypes = {
    todo: PropTpes.object.isRequired,
    deleteTodo: PropTpes.func.isRequired,
    updateTodo: PropTpes.func.isRequired,
  }

  state = {
    bgColor: 'white',
    display: 'none'
  }

  /* 
  点击删除的回调
  */
  deleteTodo = () => {
    const {todo:{id, title}, deleteTodo} = this.props  // 多层解构
    // 显示确定框, 确定后删除
    if (window.confirm(`确定删除 ${title} 吗?`)) {
      deleteTodo(id)
    }
  }

  /* 
  勾选状态改变的回调
  */
  handleChange = (e) => {
    const {updateTodo, todo} = this.props
    // 根据当前勾选的状态值更新对应todo状态
    updateTodo(todo.id, e.target.checked)
  }

  /* 
  处理鼠标移入移出2个事件的高阶函数
  */
  handleEnter = (isEnter) => {
    return () => {
      this.setState({
        bgColor: isEnter ? '#ccc' : '#fff',
        display: isEnter ? 'block' : 'none',
      })
    }
  }

  render() {

    const {title, completed} = this.props.todo
    const {bgColor, display} = this.state

    return (
      <li style={{background: bgColor}} onMouseEnter={this.handleEnter(true)} 
        onMouseLeave={this.handleEnter(false)}>
        <label>
          <input type="checkbox" checked={completed} onChange={this.handleChange}/>
          <span>{title}</span>
        </label>
        {/* v-show效果 */}
        {/* <button className="btn btn-danger" style={{display}}>删除</button> */}
        {/* v-if效果 */}
        {display==='block' ? <button className="btn btn-danger" onClick={this.deleteTodo}>删除</button> : null}
      </li>
    )
  }
}

/* 
1. 鼠标移入移出
2. 删除
3. 勾选
*/